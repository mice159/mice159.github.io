// 퀘스트 페이지: 초상화 중앙 + 리스트 패널 + 모달 상세 (메모/범례 제거)

const qDom = {
  npcGrid: null,
  npcQuestList: null,
  selectedNpcName: null,
  modal: null,
  modalBody: null,
  modalClose: null
};

let selectedNpcId = null;

function el(tag, cls, children) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (children) children.forEach(c => e.append(c));
  return e;
}

function createKappaBadge(required) {
  const b = el("span", `kappa-badge ${required ? "kappa-yes" : "kappa-no"}`);
  b.textContent = `카파: ${required ? "예" : "아니요"}`;
  return b;
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMultilineDescription(text) {
  const safe = escapeHtml(text);
  const parts = safe.split(/(?:,|·|\/|;)\s+/g).map(s => s.trim()).filter(Boolean);
  if (parts.length <= 1) return safe;
  return parts.map(p => `• ${p}`).join("<br>");
}

function splitDescriptionParts(text) {
  const safe = escapeHtml(text);
  return safe.split(/(?:,|·|\/|;)\s+/g).map(s => s.trim()).filter(Boolean);
}

function renderDescriptionPreview(text, maxItems) {
  const parts = splitDescriptionParts(text);
  if (parts.length <= maxItems) {
    return parts.map(p => `• ${p}`).join("<br>");
  }
  const shown = parts.slice(0, maxItems).map(p => `• ${p}`).join("<br>");
  const rest = parts.length - maxItems;
  return `${shown}<br>… 외 ${rest}개`;
}

function renderPreviewFromDetails(quest) {
  if (typeof questDetails !== "undefined" && questDetails[quest.id]) {
    const d = questDetails[quest.id];
    if (Array.isArray(d.preview) && d.preview.length > 0) {
      return d.preview.map(p => `• ${escapeHtml(p)}`).join("<br>");
    }
    if (typeof d.preview === "string" && d.preview.trim()) {
      return `• ${escapeHtml(d.preview.trim())}`;
    }
  }
  return null;
}
// positions.js에 정의된 고정 좌표를 우선 사용
function getImmutablePositionForQuest(quest) {
  try {
    if (!quest || !quest.id) return null;
    const imm = (window && window.IMMUTABLE_POSITIONS) || {};
    const entry = imm[quest.id];
    if (!entry) return null;
    if (!Array.isArray(entry)) {
      if (entry && typeof entry.x === "number" && typeof entry.y === "number") return entry;
      return null;
    }
    const mapCode = detectQuestMap(quest); // 퀘스트 텍스트 기반 맵 감지
    if (mapCode) {
      const hit = entry.find(it => (it && typeof it.x === "number" && typeof it.y === "number" && String(it.map || "").toLowerCase() === String(mapCode).toLowerCase()));
      if (hit) return { x: hit.x, y: hit.y };
    }
    const emptyMap = entry.find(it => it && (it.map === "" || it.map == null) && typeof it.x === "number" && typeof it.y === "number");
    if (emptyMap) return { x: emptyMap.x, y: emptyMap.y };
    const first = entry.find(it => it && typeof it.x === "number" && typeof it.y === "number");
    if (first) return { x: first.x, y: first.y };
  } catch {}
  return null;
}
function resolvePosition(quest) {
  const imm = getImmutablePositionForQuest(quest);
  if (imm) return imm;
  if (quest && quest.position && typeof quest.position.x === "number" && typeof quest.position.y === "number") {
    return quest.position;
  }
  // fallback: 결정적 가짜 좌표
  const id = quest && quest.id ? quest.id : Math.random().toString(36).slice(2);
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  const col = hash % 7;
  const row = Math.floor((hash >> 3) % 6);
  const x = 10 + col * 12;
  const y = 20 + row * 10;
  return { x, y };
}

function getNpcInitials(name) {
  const words = name.split(/\s+/);
  const initials = words.slice(0, 2).map(w => w[0]).join("");
  return initials.toUpperCase();
}

// 프로필 이미지 로더: Profil/ 디렉토리에서 id/이름 기반 파일을 확장자 우선순위대로 시도
function loadNpcProfileImage(imgEl, npc, fallbackEl) {
  // 특정 id에 대한 파일명 별칭(예: btr → btr_driver)
  const aliasBaseNamesById = {
    btr: ["btr_driver"]
  };
  const baseNames = Array.from(new Set([
    npc.id || "",
    ...(aliasBaseNamesById[npc.id] || []),
    npc.name || "",
    String(npc.name || "").replace(/\s+/g, "_"),
    String(npc.name || "").replace(/\s+/g, "")
  ])).filter(Boolean);
  const exts = ["png", "jpg", "jpeg", "webp"];
  const candidates = [];
  for (const b of baseNames) {
    for (const ext of exts) {
      candidates.push(`Profil/${b}.${ext}`);
    }
  }
  let idx = 0;
  function tryNext() {
    if (idx >= candidates.length) {
      // 모두 실패: 이니셜 유지
      if (imgEl && imgEl.parentElement) {
        imgEl.remove();
        imgEl.parentElement.classList.remove("skeleton");
      }
      return;
    }
    const src = candidates[idx++];
    imgEl.onload = () => {
      if (fallbackEl) fallbackEl.style.display = "none";
      imgEl.style.display = "block";
      if (imgEl.parentElement) {
        imgEl.parentElement.classList.remove("skeleton");
      }
    };
    imgEl.onerror = tryNext;
    imgEl.src = src;
  }
  tryNext();
}

function renderNpcGrid() {
  qDom.npcGrid.innerHTML = "";
  const items = [...npcs];
  // 10칸으로 맞추기 (플레이스홀더 추가)
  const placeholders = Math.max(0, 10 - items.length);
  for (let i = 0; i < items.length; i++) {
    const npc = items[i];
    const tile = el("div", "npc-portrait");
    if (npc.id === selectedNpcId) tile.classList.add("active");
    const avatar = el("div", "avatar");
    avatar.style.background = npc.color;
    avatar.classList.add("skeleton");
    // 프로필 이미지 시도
    const img = document.createElement("img");
    img.style.display = "none";
    loadNpcProfileImage(img, npc, null);
    avatar.append(img);
    const label = el("div", "label", [document.createTextNode(npc.name)]);
    tile.append(avatar, label);
    // 타일 클릭: 상인 선택
    tile.addEventListener("click", () => {
      selectedNpcId = npc.id;
      renderNpcGrid();
      renderNpcQuestList();
    });
    qDom.npcGrid.append(tile);
  }
  for (let i = 0; i < placeholders; i++) {
    const tile = el("div", "npc-portrait placeholder");
    const avatar = el("div", "avatar");
    avatar.style.background = "#2f3a54";
    avatar.append(document.createTextNode("?"));
    const label = el("div", "label", [document.createTextNode("빈 슬롯")]);
    tile.append(avatar, label);
    qDom.npcGrid.append(tile);
  }
}

function renderNpcQuestList() {
  qDom.npcQuestList.innerHTML = "";
  const npc = npcs.find(n => n.id === selectedNpcId) || npcs[0];
  if (!npc) return;
  selectedNpcId = npc.id;
  // 헤더에 즉시 프로필 표시 (아바타 + 이름)
  qDom.selectedNpcName.innerHTML = "";
  const headerAvatar = el("div", "avatar");
  headerAvatar.style.background = npc.color;
  headerAvatar.classList.add("skeleton");
  const headerImg = document.createElement("img");
  headerImg.style.display = "none";
  loadNpcProfileImage(headerImg, npc, null);
  headerAvatar.append(headerImg);
  const headerName = el("span", "", [document.createTextNode(npc.name)]);
  qDom.selectedNpcName.append(headerAvatar, headerName);

  const questList = el("div", "quest-list");
  for (const quest of npc.quests) {
    const qCard = el("div", "quest");
    const head = el("div", "quest-header");
    const qTitle = el("div", "quest-title"); qTitle.textContent = quest.title;
    const kBadge = createKappaBadge(!!quest.requiresKappa);

    // 맵 표시 배지
    const mapCode = detectQuestMap(quest);
    const mapBadge = el("span", `map-badge${mapCode ? "" : " map-none"}`);
    mapBadge.textContent = mapCode ? mapCodeToLabel(mapCode) : "X";
    mapBadge.title = mapCode ? `이 퀘스트가 진행되는 맵: ${mapCodeToLabel(mapCode)}` : "특정 맵 없음/여러 맵";
    const actions = el("div", "quest-actions");

    // 리스트 항목 클릭 시 모달 오픈
    qCard.addEventListener("click", () => openQuestModal(npc, quest));

    const mapToggle = el("button", isMapped(quest.id) ? "btn secondary" : "btn ghost");
    mapToggle.textContent = isMapped(quest.id) ? "맵 해제" : "맵 표시";
    mapToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isMapped(quest.id)) removeFromMapped(quest.id); else addToMapped(quest.id);
      const mapped = isMapped(quest.id);
      mapToggle.className = mapped ? "btn secondary" : "btn ghost";
      mapToggle.textContent = mapped ? "맵 해제" : "맵 표시";
    });

    actions.append(mapToggle);
    // 카파 여부와 맵 표시 버튼 사이에 맵 배지 배치
    head.append(qTitle, kBadge, mapBadge, actions);
    const summaryText = normalizeMapNamesInText(quest.description);
    const summary = el("div");
    const detailsPreview = renderPreviewFromDetails(quest);
    if (detailsPreview) {
      summary.innerHTML = detailsPreview;
    } else {
      const compact = npc.id === "ref" || npc.id === "lightkeeper";
      summary.innerHTML = compact ? renderDescriptionPreview(summaryText, 2) : renderMultilineDescription(summaryText);
    }
    summary.style.color = "#90a0b7"; summary.style.fontSize = "12px";
    qCard.append(head, summary);
    qDom.npcQuestList.append(qCard);
  }
}

function openQuestModal(npc, quest) {
  const state = getQuestState(quest.id);
  qDom.modalBody.innerHTML = "";

  const box = el("div", "quest");
  const head = el("div", "quest-header");
  const left = el("div", "mapped-title");
  const dot = el("span", "npc-dot"); dot.style.background = npc.color;
  const title = el("span", "title-text", [document.createTextNode(`${npc.name} · ${quest.title}`)]);
  const kBadge = createKappaBadge(!!quest.requiresKappa);

  // 맵 표시 배지 (모달에서도 카파와 '맵 표시' 버튼 사이)
  const mapCode = detectQuestMap(quest);
  const mapBadge = el("span", `map-badge${mapCode ? "" : " map-none"}`);
  mapBadge.textContent = mapCode ? mapCodeToLabel(mapCode) : "X";
  mapBadge.title = mapCode ? `이 퀘스트가 진행되는 맵: ${mapCodeToLabel(mapCode)}` : "특정 맵 없음/여러 맵";

  left.append(dot, title, kBadge, mapBadge);

  const actions = el("div", "quest-actions");
  const mapBtn = el("button", isMapped(quest.id) ? "btn secondary" : "btn ghost");
  mapBtn.textContent = isMapped(quest.id) ? "맵 해제" : "맵 표시";
  mapBtn.addEventListener("click", () => {
    if (isMapped(quest.id)) removeFromMapped(quest.id); else addToMapped(quest.id);
    const mapped = isMapped(quest.id);
    mapBtn.className = mapped ? "btn secondary" : "btn ghost";
    mapBtn.textContent = mapped ? "맵 해제" : "맵 표시";
  });

  const doneWrap = el("label", "chk-label");
  const doneChk = document.createElement("input"); doneChk.type = "checkbox"; doneChk.checked = !!state.done;
  doneChk.addEventListener("click", (e) => { e.stopPropagation(); });
  doneChk.addEventListener("change", () => { persistQuestState(quest.id, { done: doneChk.checked }); });
  doneWrap.append(doneChk, document.createTextNode(" 완료"));

  actions.append(mapBtn, doneWrap);
  head.append(left, actions);

  const descText = normalizeMapNamesInText(quest.description);
  const desc = el("p");
  desc.innerHTML = renderMultilineDescription(descText);
  const pos = resolvePosition(quest);
  const coord = el("div", "coord"); coord.style.color = "#90a0b7"; coord.style.fontSize = "12px"; coord.textContent = `좌표: ${pos.x}%, ${pos.y}%`;

  // 보상 섹션 (있을 경우에만)
  let rewardsSection = null;
  if (Array.isArray(quest.rewards) && quest.rewards.length > 0) {
    rewardsSection = el("div");
    const h = el("h3"); h.textContent = "보상"; h.style.fontSize = "14px"; h.style.margin = "10px 0 6px";
    const ul = el("ul"); ul.style.margin = "0"; ul.style.paddingLeft = "18px";
    for (const r of quest.rewards) {
      const li = el("li"); li.textContent = r; ul.append(li);
    }
    rewardsSection.append(h, ul);
  }

  // 상세 단계 렌더 (있을 경우)
  if (typeof questDetails !== "undefined" && questDetails[quest.id] && Array.isArray(questDetails[quest.id].steps)) {
    const stepsWrap = el("div");
    const h = el("h3"); h.textContent = "무엇을 어떻게 해야 하나요";
    h.style.fontSize = "14px"; h.style.margin = "10px 0 6px";
    const ul = el("ul"); ul.style.margin = "0"; ul.style.paddingLeft = "18px";
    for (const s of questDetails[quest.id].steps) {
      const li = el("li"); li.textContent = normalizeMapNamesInText(s); ul.append(li);
    }
    stepsWrap.append(h, ul);
    if (rewardsSection) {
      box.append(head, desc, coord, rewardsSection, stepsWrap);
    } else {
      box.append(head, desc, coord, stepsWrap);
    }
  } else {
    if (rewardsSection) {
      box.append(head, desc, coord, rewardsSection);
    } else {
      box.append(head, desc, coord);
    }
  }
  qDom.modalBody.append(box);
  qDom.modal.classList.remove("hidden");
  qDom.modal.setAttribute("aria-hidden", "false");
}

// 맵 자동 감지: 퀘스트 설명/제목에서 대표 맵명 키워드 추출
function detectQuestMap(quest) {
  const text = `${quest.title || ""} ${quest.description || ""}`.toLowerCase();
  const patterns = [
    { code: "customs", re: /\bcustoms?\b|세관/ },
    { code: "woods", re: /\bwoods?\b|삼림/ },
    { code: "factory", re: /\bfactory\b|팩토리/ },
    { code: "reserve", re: /\breserve\b|리저브/ },
    { code: "lighthouse", re: /\blighthouse\b|등대/ },
    { code: "shoreline", re: /\bshoreline\b|해안선/ },
    { code: "interchange", re: /\binterchange\b|인터체인지/ },
    { code: "streets", re: /\bstreets\b|\bstreets of tarkov\b|타르코프\s*시내/ },
    { code: "ground_zero", re: /\bground\s*zero\b|그라운드\s*제로/ },
    { code: "lab", re: /\bthe lab\b|\blabs?\b/ }
  ];
  for (const p of patterns) {
    if (p.re.test(text)) return p.code;
  }
  return null; // 특정 맵 아님/여러 맵
}

function mapCodeToLabel(code) {
  const labels = {
    customs: "Customs",
    woods: "Woods",
    factory: "Factory",
    reserve: "Reserve",
    lighthouse: "Lighthouse",
    shoreline: "Shoreline",
    interchange: "Interchange",
    streets: "Streets of Tarkov",
    ground_zero: "Ground Zero",
    lab: "The Lab"
  };
  return labels[code] || code;
}

// 표시용 텍스트에서 Streets → Streets of Tarkov로 치환
function normalizeMapNamesInText(text) {
  return String(text || "").replace(/\bstreets\b/gi, "Streets of Tarkov");
}

function closeModal() {
  qDom.modal.classList.add("hidden");
  qDom.modal.setAttribute("aria-hidden", "true");
}

function initQuestsPage() {
  qDom.npcGrid = document.getElementById("npcGrid");
  qDom.npcQuestList = document.getElementById("npcQuestList");
  qDom.selectedNpcName = document.getElementById("selectedNpcName");
  qDom.modal = document.getElementById("questModal");
  qDom.modalBody = document.getElementById("modalBody");
  qDom.modalClose = document.getElementById("modalClose");

  qDom.modalClose.addEventListener("click", closeModal);
  qDom.modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) closeModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  selectedNpcId = npcs[0] ? npcs[0].id : null;
  renderNpcGrid();
  renderNpcQuestList();
}

document.addEventListener("DOMContentLoaded", initQuestsPage);


