// 지도 중심 페이지 스크립트

const mapDom = {
  map: null,
  clearMarkersBtn: null,
  toggleGrid: null,
  mappedList: null,
  modal: null,
  modalBody: null,
  modalClose: null
};

// 하나의 퀘스트가 여러 좌표를 가질 수 있으므로
// questId -> 해당 퀘스트 마커 DOM 배열을 저장
const markerByQuestId = new Map();
let currentMapName = null; // 현재 선택된 맵 코드 (customs, woods, ...)
let zoomState = { zoom: 1, panX: 0, panY: 0 };
const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const ZOOM_STEP = 1.2;

// 좌표 고정값 쓰기 유틸 (positions.js의 IMMUTABLE_POSITIONS에 반영)
// 한 번 Alt+클릭할 때마다 기존 값은 유지하고 "새 좌표"를 추가합니다.
function setImmutablePosition(questId, mapCode, x, y) {
  try {
    if (!questId || typeof window === "undefined") return;
    const store = window.IMMUTABLE_POSITIONS || (window.IMMUTABLE_POSITIONS = {});
    let entry = store[questId];
    if (!entry) {
      entry = [];
    }
    if (!Array.isArray(entry)) {
      entry = [entry];
    }
    const targetMapCode = (mapCode || "").toLowerCase();
    entry.push({ map: targetMapCode || "", x, y });
    store[questId] = entry;
  } catch {
    // 좌표 편집 도중 오류가 나더라도 앱 전체 동작에는 영향 없도록 무시
  }
}

function getImmutablePosition(quest) {
  try {
    const imm = (window && window.IMMUTABLE_POSITIONS) || {};
    const entry = imm[quest.id];
    if (!entry) return null;
    // 단일 객체 지원(하위 호환)
    if (!Array.isArray(entry)) {
      if (entry && typeof entry.x === "number" && typeof entry.y === "number") return entry;
      return null;
    }
    // 배열: 맵 코드로 선택
    const byArray = entry;
    // 현재 선택된 맵 우선
    const mapCode = currentMapName || detectQuestMap(quest);
    if (mapCode) {
      const hit = byArray.find(it => (it && typeof it.x === "number" && typeof it.y === "number" && String(it.map || "").toLowerCase() === String(mapCode).toLowerCase()));
      if (hit) return { x: hit.x, y: hit.y };
    }
    // 맵이 비어있는 첫 좌표 또는 첫 요소
    const emptyMap = byArray.find(it => it && (it.map === "" || it.map == null) && typeof it.x === "number" && typeof it.y === "number");
    if (emptyMap) return { x: emptyMap.x, y: emptyMap.y };
    const first = byArray.find(it => it && typeof it.x === "number" && typeof it.y === "number");
    if (first) return { x: first.x, y: first.y };
  } catch {}
  return null;
}

// IMMUTABLE_POSITIONS에서 퀘스트의 첫 번째 유효한 좌표의 맵 코드를 반환
// 좌표가 없으면 null 반환
function getQuestMapFromPositions(quest) {
  try {
    const imm = (window && window.IMMUTABLE_POSITIONS) || {};
    const entry = imm[quest.id];
    if (!entry) return null;
    
    const entries = Array.isArray(entry) ? entry : [entry];
    const isValid = (it) => it && typeof it.x === "number" && typeof it.y === "number" && (it.x !== 0 || it.y !== 0);
    
    // 첫 번째 유효한 좌표의 맵 코드 반환
    for (const pos of entries) {
      if (isValid(pos)) {
        const mapCode = (pos.map || "").toLowerCase();
        if (mapCode) return mapCode;
      }
    }
  } catch {}
  return null;
}

// 현재 맵 기준으로 퀘스트에 연결된 모든 "실제" 좌표 목록을 반환
// - positions.js의 IMMUTABLE_POSITIONS에 여러 개가 있으면 전부 사용
// - 현재 맵 코드와 일치하는 것 우선, 없으면 map이 비어 있는 항목, 그래도 없으면 전부
// - IMMUTABLE_POSITIONS가 비어 있으면 빈 배열을 반환(기본/가짜 좌표는 사용하지 않음)
function getAllPositionsForQuest(quest) {
  const positions = [];
  try {
    const imm = (window && window.IMMUTABLE_POSITIONS) || {};
    let entry = imm[quest.id];
    if (entry) {
      if (!Array.isArray(entry)) entry = [entry];
      const mapCode = currentMapName || detectQuestMap(quest);
      const isValid = (it) => it && typeof it.x === "number" && typeof it.y === "number";

      if (mapCode) {
        const exact = entry.filter(
          it =>
            isValid(it) &&
            String(it.map || "").toLowerCase() === String(mapCode).toLowerCase()
        );
        if (exact.length) return exact.map(it => ({ x: it.x, y: it.y }));

        const emptyMap = entry.filter(
          it => isValid(it) && (it.map === "" || it.map == null)
        );
        if (emptyMap.length) return emptyMap.map(it => ({ x: it.x, y: it.y }));

        // 현재 맵 코드가 있는데, 일치하는 map 값이 전혀 없다면
        // 다른 맵 좌표를 강제로 그리지 않도록 빈 배열 반환
        return [];
      }

      const all = entry.filter(isValid);
      if (all.length) return all.map(it => ({ x: it.x, y: it.y }));
    }
  } catch {}

  // 좌표 정보가 전혀 없으면 빈 배열 반환
  return [];
}

// 퀘스트 텍스트에서 맵 코드 추출 (quests.js와 동일 규칙)
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
    { code: "streets", re: /\bstreets of tarkov\b|\bstreets\b|타르코프\s*시내/ },
    { code: "ground_zero", re: /\bground\s*zero\b|그라운드\s*제로/ },
    { code: "lab", re: /\bthe lab\b|\blabs?\b/ }
  ];
  for (const p of patterns) {
    if (p.re.test(text)) return p.code;
  }
  return null;
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
    lab: "The Lab",
    labrynth: "Labrynth",
    reserve_b1: "Reserve B1"
  };
  return labels[code] || code;
}

// UI에서 표시할 "대표 맵 코드"
// 1) IMMUTABLE_POSITIONS에 좌표가 있으면 그 좌표의 맵 코드 사용
// 2) 없으면 기존 텍스트 기반 detectQuestMap 결과 사용
function getQuestPrimaryMapCode(quest) {
  const fromPos = getQuestMapFromPositions(quest);
  if (fromPos) return fromPos;
  return detectQuestMap(quest);
}

function createEl(tag, className, children) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (children) children.forEach(c => el.append(c));
  return el;
}

function createKappaBadge(required) {
  const b = createEl("span", `kappa-badge ${required ? "kappa-yes" : "kappa-no"}`);
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

function resolvePosition(quest) {
  // 1) 코드에 고정된 좌표(전역 positions.js) 우선
  if (quest && quest.id) {
    const imm = getImmutablePosition(quest);
    if (imm) return imm;
  }
  // 2) 퀘스트 객체에 직접 정의된 좌표가 있다면 사용
  if (
    quest &&
    quest.position &&
    typeof quest.position.x === "number" &&
    typeof quest.position.y === "number"
  ) {
    return quest.position;
  }
  // 3) 표시용으로만 사용하는 결정적 가짜 좌표 (실제 마커에는 사용하지 않음)
  const id = quest && quest.id ? quest.id : Math.random().toString(36).slice(2);
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  const col = hash % 7;
  const row = Math.floor((hash >> 3) % 6);
  const x = 10 + col * 12;
  const y = 20 + row * 10;
  return { x, y };
}

// 범례 제거됨

function addOrUpdateMarker(qid, npc, quest) {
  // 기존 마커들 제거
  const existing = markerByQuestId.get(qid);
  if (Array.isArray(existing)) {
    existing.forEach(m => m.remove());
  }

  const order = typeof loadMappedArray === "function" ? loadMappedArray() : [];
  const idx = Math.max(0, order.indexOf(qid));
  const orderColor = (typeof npcColors !== "undefined" && Array.isArray(npcColors) && npcColors.length > 0)
    ? npcColors[idx % npcColors.length]
    : (npc && npc.color) || "#6ea8fe";

  const positions = getAllPositionsForQuest(quest);
  const created = [];
  const parent = (mapDom.canvas || mapDom.map);

  positions.forEach((pos, i) => {
    const marker = createEl("div", "marker pulse");
    marker.setAttribute("data-quest-id", qid);
    marker.style.color = orderColor;
    marker.style.left = `${pos.x}%`;
    marker.style.top = `${pos.y}%`;
    marker.style.background = orderColor;
    const lbl = createEl("div", "marker-label");
    // 동일 퀘스트 내에서 여러 좌표일 경우 1-1, 1-2 형식으로 표기
    lbl.textContent = positions.length > 1 ? `${idx + 1}-${i + 1}` : String(idx + 1);
    marker.append(lbl);
    parent.append(marker);
    marker.classList.remove("pulse"); void marker.offsetWidth; marker.classList.add("pulse");
    created.push(marker);
  });

  markerByQuestId.set(qid, created);
}

function removeMarker(qid) {
  const arr = markerByQuestId.get(qid);
  if (Array.isArray(arr)) {
    arr.forEach(m => m.remove());
  }
  markerByQuestId.delete(qid);
}

function clearAll() {
  // 매핑 상태 비우고 마커 삭제
  const set = loadMappedSet();
  for (const id of Array.from(set)) removeFromMapped(id);
  for (const value of markerByQuestId.values()) {
    if (Array.isArray(value)) {
      value.forEach(m => m && typeof m.remove === "function" && m.remove());
    } else if (value && typeof value.remove === "function") {
      value.remove();
    }
  }
  markerByQuestId.clear();
  renderMappedList();
}

function renderMappedList() {
  mapDom.mappedList.innerHTML = "";
  const set = loadMappedSet();

  // 기존 마커 모두 제거 후 현재 맵에 해당하는 것만 다시 그리기
  for (const value of markerByQuestId.values()) {
    if (Array.isArray(value)) {
      value.forEach(m => m && typeof m.remove === "function" && m.remove());
    } else if (value && typeof value.remove === "function") {
      value.remove();
    }
  }
  markerByQuestId.clear();

  if (set.size === 0) {
    const empty = createEl("p", null, [document.createTextNode("매핑된 퀘스트가 없습니다. 퀘스트 페이지에서 '맵에 표시'를 사용하세요.")]);
    empty.style.color = "#90a0b7";
    empty.style.fontSize = "13px";
    mapDom.mappedList.append(empty);
    return;
  }

  let shown = 0;
  for (const questId of set) {
    const res = getQuestById(questId);
    if (!res) continue;
    const { npc, quest } = res;

    const mapCode = getQuestPrimaryMapCode(quest);
    // 현재 맵에 실제 좌표가 있는 퀘스트만 마커를 그림
    const positionsForCurrent = getAllPositionsForQuest(quest);
    const hasPositionsOnCurrent =
      Array.isArray(positionsForCurrent) && positionsForCurrent.length > 0;
    if (hasPositionsOnCurrent) {
      addOrUpdateMarker(questId, npc, quest);
    }

    const state = getQuestState(questId);
    const card = createEl("div", "mapped-card");
    // 제목 행
    const left = createEl("div", "mapped-title");
    const order = typeof loadMappedArray === "function" ? loadMappedArray() : [];
    const idx = Math.max(0, order.indexOf(questId));
    const orderColor = (typeof npcColors !== "undefined" && Array.isArray(npcColors) && npcColors.length > 0)
      ? npcColors[idx % npcColors.length]
      : npc.color;
    const dot = createEl("span", "npc-dot"); dot.style.background = orderColor;
    const t = createEl("span", "title-text", [document.createTextNode(`${npc.name} · ${quest.title}`)]);
    const mapBadge = createEl("span", `map-badge${mapCode ? "" : " map-none"}`);
    mapBadge.textContent = mapCode ? mapCodeToLabel(mapCode) : "X";
    mapBadge.title = mapCode ? `이 퀘스트 맵: ${mapCodeToLabel(mapCode)}` : "특정 맵 없음/여러 맵";
    const orderBadge = createEl("span", "order-badge", [document.createTextNode(String(idx + 1))]);
    left.append(dot, t, mapBadge, orderBadge);

    // 액션 행 (제목 아래)
    const actions = createEl("div", "mapped-actions");
    const chkWrap = createEl("label", "chk-label");
    const chk = document.createElement("input");
    chk.type = "checkbox"; chk.checked = !!state.done;
    chk.addEventListener("click", (e) => { e.stopPropagation(); });
    chk.addEventListener("change", () => { persistQuestState(questId, { done: chk.checked }); });
    chkWrap.append(chk, document.createTextNode(" 완료"));

    const removeBtn = createEl("button", "btn ghost");
    removeBtn.textContent = "제거";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFromMapped(questId);
      removeMarker(questId);
      renderMappedList();
    });

    // 해당 맵으로 이동 버튼
    // - 좌표가 있으면 좌표의 맵 코드로 이동
    // - 좌표가 없으면 텍스트 기반 맵 감지 결과로 이동
    const questMapCode = getQuestPrimaryMapCode(quest);
    if (questMapCode) {
      const gotoBtn = createEl("button", "btn secondary");
      gotoBtn.textContent = "해당 맵으로 이동";
      gotoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        // 맵 코드에 따라 적절한 탭 선택
        let targetTab = null;
        if (questMapCode === "labrynth") {
          // Labrynth는 Shoreline 하위 맵이므로 Shoreline 탭을 클릭하고 하위 탭도 활성화
          const shorelineTab = document.querySelector(`.map-tab[data-map="shoreline"]`);
          if (shorelineTab) {
            shorelineTab.click();
            setTimeout(() => {
              const labrynthTab = document.querySelector(`.floor-tab[data-floor="labrynth"]`);
              if (labrynthTab) labrynthTab.click();
            }, 100);
          }
        } else if (questMapCode === "reserve_b1") {
          // Reserve B1은 Reserve 하위 맵이므로 Reserve 탭을 클릭하고 하위 탭도 활성화
          const reserveTab = document.querySelector(`.map-tab[data-map="reserve"]`);
          if (reserveTab) {
            reserveTab.click();
            setTimeout(() => {
              const b1Tab = document.querySelector(`.floor-tab[data-floor="reserve_b1"]`);
              if (b1Tab) b1Tab.click();
            }, 100);
          }
        } else if (questMapCode.startsWith("the_lap_")) {
          // Lab 층은 Lab 탭을 클릭하고 해당 층 탭도 활성화
          const labTab = document.querySelector(`.map-tab[data-map="lab"]`);
          if (labTab) {
            labTab.click();
            setTimeout(() => {
              const floorTab = document.querySelector(`.floor-tab[data-floor="${questMapCode}"]`);
              if (floorTab) floorTab.click();
            }, 100);
          }
        } else {
          // 일반 맵
          targetTab = document.querySelector(`.map-tab[data-map="${questMapCode}"]`);
          if (targetTab) targetTab.click();
        }
      });
      actions.append(gotoBtn);
    }

    actions.append(chkWrap, removeBtn);

    const pos = resolvePosition(quest);
    const coord = createEl("div", "coord");
    coord.style.color = "#90a0b7"; coord.style.fontSize = "12px";
    coord.textContent = `좌표: ${pos.x}%, ${pos.y}%`;

    card.append(left, actions, coord);
    card.addEventListener("click", () => openMappedQuestModal(npc, quest));
    // 현재 맵에 좌표가 있는 퀘스트만 호버 시 마커를 다시 그림
    if (hasPositionsOnCurrent) {
      card.addEventListener("mouseenter", () => addOrUpdateMarker(questId, npc, quest));
    }
    mapDom.mappedList.append(card);
    shown++;
  }

  if (shown === 0) {
    const empty = createEl("p", null, [document.createTextNode("매핑된 퀘스트가 없습니다. 퀘스트 페이지에서 '맵에 표시'를 사용하세요.")]);
    empty.style.color = "#90a0b7";
    empty.style.fontSize = "13px";
    mapDom.mappedList.append(empty);
  }
}

function setupEvents() {
  mapDom.clearMarkersBtn.addEventListener("click", clearAll);
  mapDom.toggleGrid.addEventListener("change", () => {
    mapDom.map.classList.toggle("show-grid", mapDom.toggleGrid.checked);
  });
}

function closeMapModal() {
  if (!mapDom.modal) return;
  mapDom.modal.classList.add("hidden");
  mapDom.modal.setAttribute("aria-hidden", "true");
}

function openMappedQuestModal(npc, quest) {
  if (!mapDom.modal || !mapDom.modalBody) return;
  mapDom.modalBody.innerHTML = "";

  const box = createEl("div", "quest");
  const head = createEl("div", "quest-header");
  const left = createEl("div", "mapped-title");
  const dot = createEl("span", "npc-dot"); dot.style.background = npc.color;
  const title = createEl("span", "title-text", [document.createTextNode(`${npc.name} · ${quest.title}`)]);

  const mapCode = getQuestPrimaryMapCode(quest);
  const mapBadge = createEl("span", `map-badge${mapCode ? "" : " map-none"}`);
  mapBadge.textContent = mapCode ? mapCodeToLabel(mapCode) : "X";
  mapBadge.title = mapCode ? `이 퀘스트가 진행되는 맵: ${mapCodeToLabel(mapCode)}` : "특정 맵 없음/여러 맵";

  left.append(dot, title, mapBadge);

  const actions = createEl("div", "quest-actions");
  const doneWrap = createEl("label", "chk-label");
  const doneChk = document.createElement("input"); doneChk.type = "checkbox"; doneChk.checked = !!getQuestState(quest.id).done;
  doneChk.addEventListener("change", () => { persistQuestState(quest.id, { done: doneChk.checked }); });
  doneWrap.append(doneChk, document.createTextNode(" 완료"));
  actions.append(doneWrap);

  head.append(left, actions);

  const desc = createEl("p");
  desc.innerHTML = renderMultilineDescription(quest.description || "");
  const pos = resolvePosition(quest);
  let coord = null;
  if (pos) {
    coord = createEl("div", "coord");
    coord.style.color = "#90a0b7";
    coord.style.fontSize = "12px";
    coord.textContent = `좌표: ${pos.x}%, ${pos.y}%`;
  }

  // 보상 섹션 (있을 경우)
  let rewardsSection = null;
  if (Array.isArray(quest.rewards) && quest.rewards.length > 0) {
    rewardsSection = createEl("div");
    const h = createEl("h3"); h.textContent = "보상"; h.style.fontSize = "14px"; h.style.margin = "10px 0 6px";
    const ul = createEl("ul"); ul.style.margin = "0"; ul.style.paddingLeft = "18px";
    for (const r of quest.rewards) {
      const li = createEl("li"); li.textContent = r; ul.append(li);
    }
    rewardsSection.append(h, ul);
  }

  if (typeof questDetails !== "undefined" && questDetails[quest.id] && Array.isArray(questDetails[quest.id].steps)) {
    const stepsWrap = createEl("div");
    const h = createEl("h3"); h.textContent = "무엇을 어떻게 해야 하나요"; h.style.fontSize = "14px"; h.style.margin = "10px 0 6px";
    const ul = createEl("ul"); ul.style.margin = "0"; ul.style.paddingLeft = "18px";
    for (const s of questDetails[quest.id].steps) {
      const li = createEl("li"); li.textContent = s; ul.append(li);
    }
    stepsWrap.append(h, ul);
    if (rewardsSection) {
      box.append(head, desc);
      if (coord) box.append(coord);
      box.append(rewardsSection, stepsWrap);
    } else {
      box.append(head, desc);
      if (coord) box.append(coord);
      box.append(stepsWrap);
    }
  } else {
    if (rewardsSection) {
      box.append(head, desc);
      if (coord) box.append(coord);
      box.append(rewardsSection);
    } else {
      box.append(head, desc);
      if (coord) box.append(coord);
    }
  }

  mapDom.modalBody.append(box);
  mapDom.modal.classList.remove("hidden");
  mapDom.modal.setAttribute("aria-hidden", "false");
}

function initMapPage() {
  mapDom.map = document.getElementById("map");
  mapDom.canvas = document.getElementById("mapCanvas");
  mapDom.clearMarkersBtn = document.getElementById("clearMarkersBtn");
  mapDom.toggleGrid = document.getElementById("toggleGrid");
  mapDom.mappedList = document.getElementById("mappedList");
  mapDom.modal = document.getElementById("mapQuestModal");
  mapDom.modalBody = document.getElementById("mapModalBody");
  mapDom.modalClose = document.getElementById("mapModalClose");
  mapDom.floorTabs = document.getElementById("floorTabs");
  mapDom.zoomInBtn = document.getElementById("zoomInBtn");
  mapDom.zoomOutBtn = document.getElementById("zoomOutBtn");
  mapDom.resetZoomBtn = document.getElementById("resetZoomBtn");
  mapDom.coordStatus = document.getElementById("coordStatus");

  setupEvents();
  renderMappedList();

  if (mapDom.modal && mapDom.modalClose) {
    mapDom.modalClose.addEventListener("click", closeMapModal);
    mapDom.modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) closeMapModal();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMapModal(); });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 맵 페이지 요소/이벤트 초기화
  initMapPage();

  const mapTabs = document.querySelectorAll('.map-tab');
  let currentMap = null;
  let currentFloorCode = "the_lap_1f";
  const floorTabs = mapDom.floorTabs;
  const floorButtons = floorTabs ? floorTabs.querySelectorAll('.floor-tab') : [];
  const originalFloorConfigs = floorTabs
    ? Array.from(floorButtons).map(btn => ({
        el: btn,
        code: btn.getAttribute("data-floor"),
        label: btn.textContent
      }))
    : [];

  // 좌표 편집 관리자 모드
  const ADMIN_FLAG_KEY = "coordEditorAdmin_v1";
  const ADMIN_PASSWORD = "1234"; // 필요 시 여기서 비밀번호를 변경하세요.
  let coordAdmin = false;
  let currentEditQuestId = null;

  function initCoordEditor() {
    if (!mapDom.map || mapDom.coordEditorPanel) return;

    const panel = document.createElement("div");
    panel.className = "coord-editor";

    const title = document.createElement("div");
    title.className = "coord-editor-title";
    title.textContent = "좌표 편집 (관리자)";

    const select = document.createElement("select");
    select.className = "coord-editor-select";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "퀘스트 선택…";
    select.append(placeholder);

    const info = document.createElement("div");
    info.className = "coord-editor-info";
    info.textContent = "퀘스트를 선택하세요.";

    const hint = document.createElement("div");
    hint.className = "coord-editor-hint";
    hint.textContent = "Alt+클릭: 현재 맵에서 선택된 퀘스트 좌표 지정";

    const undoBtn = document.createElement("button");
    undoBtn.type = "button";
    undoBtn.className = "btn ghost coord-editor-undo";
    undoBtn.textContent = "마지막 좌표 되돌리기";

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "btn ghost coord-editor-clear";
    clearBtn.textContent = "이 퀘스트 좌표 초기화";

    const exportBtn = document.createElement("button");
    exportBtn.type = "button";
    exportBtn.className = "btn ghost coord-editor-export";
    exportBtn.textContent = "JSON 복사";

    panel.append(title, select, info, hint, undoBtn, clearBtn, exportBtn);
    mapDom.map.append(panel);

    mapDom.coordEditorPanel = panel;
    mapDom.coordEditorSelect = select;
    mapDom.coordEditorInfo = info;

    select.addEventListener("change", () => {
      currentEditQuestId = select.value || null;
      updateCoordEditorInfo();
    });

    undoBtn.addEventListener("click", () => {
      if (!currentEditQuestId) {
        alert("먼저 퀘스트를 선택하세요.");
        return;
      }
      try {
        const store = (typeof window !== "undefined" && window.IMMUTABLE_POSITIONS) || {};
        let entry = store[currentEditQuestId];
        if (!entry) {
          alert("되돌릴 좌표가 없습니다.");
          return;
        }
        if (!Array.isArray(entry)) entry = [entry];
        if (!entry.length) {
          alert("되돌릴 좌표가 없습니다.");
          return;
        }
        entry.pop();
        if (entry.length === 0) {
          delete store[currentEditQuestId];
        } else {
          store[currentEditQuestId] = entry;
        }
      } catch (err) {
        console.error(err);
        alert("좌표 되돌리기 중 오류가 발생했습니다.");
        return;
      }
      updateCoordEditorInfo();
      const res = typeof getQuestById === "function" ? getQuestById(currentEditQuestId) : null;
      if (res) {
        addOrUpdateMarker(currentEditQuestId, res.npc, res.quest);
      }
      renderMappedList();
    });

    clearBtn.addEventListener("click", () => {
      if (!currentEditQuestId) {
        alert("먼저 퀘스트를 선택하세요.");
        return;
      }
      if (!window.confirm("이 퀘스트에 저장된 모든 좌표를 삭제할까요? (되돌릴 수 없습니다. positions.js에 이미 반영했다면 직접 복구해야 합니다.)")) {
        return;
      }
      try {
        const store = (typeof window !== "undefined" && window.IMMUTABLE_POSITIONS) || {};
        if (store[currentEditQuestId]) {
          delete store[currentEditQuestId];
        }
      } catch (err) {
        console.error(err);
        alert("좌표 초기화 중 오류가 발생했습니다.");
        return;
      }
      updateCoordEditorInfo();
      const res = typeof getQuestById === "function" ? getQuestById(currentEditQuestId) : null;
      if (res) {
        addOrUpdateMarker(currentEditQuestId, res.npc, res.quest);
      }
      renderMappedList();
    });

    exportBtn.addEventListener("click", () => {
      try {
        const data = (typeof window !== "undefined" && window.IMMUTABLE_POSITIONS) || {};
        const text = JSON.stringify(data, null, 2);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text)
            .then(() => alert("IMMUTABLE_POSITIONS JSON이 클립보드에 복사되었습니다.\npositions.js에 붙여 넣어 사용하세요."))
            .catch(() => {
              // 클립보드 접근 실패 시 프롬프트로 대체
              window.prompt("아래 JSON을 복사해서 positions.js에 붙여 넣으세요.", text);
            });
        } else {
          window.prompt("아래 JSON을 복사해서 positions.js에 붙여 넣으세요.", text);
        }
      } catch (err) {
        console.error(err);
        alert("좌표 JSON 내보내기 중 오류가 발생했습니다.");
      }
    });

    // Alt+클릭으로 좌표 지정
    mapDom.map.addEventListener("click", (e) => {
      if (!coordAdmin || !currentEditQuestId) return;
      if (!e.altKey) return;
      const pos = getWorldPercentFromClient(e.clientX, e.clientY);
      const res = typeof getQuestById === "function" ? getQuestById(currentEditQuestId) : null;
      if (!res) return;
      const mapCode = currentMapName || detectQuestMap(res.quest);
      setImmutablePosition(currentEditQuestId, mapCode, pos.x, pos.y);
      updateCoordEditorInfo();
      // 선택된 퀘스트 마커도 즉시 갱신
      addOrUpdateMarker(currentEditQuestId, res.npc, res.quest);
      e.stopPropagation();
    });

    refreshCoordEditorOptions();
  }

  function refreshCoordEditorOptions() {
    if (!mapDom.coordEditorSelect) return;
    const select = mapDom.coordEditorSelect;
    const prev = select.value;
    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "퀘스트 선택…";
    select.append(placeholder);

    if (!Array.isArray(npcs)) return;
    const options = [];
    for (const npc of npcs) {
      if (!npc || !Array.isArray(npc.quests)) continue;
      for (const quest of npc.quests) {
        const code = getQuestPrimaryMapCode(quest);
        const mapLabel = code ? ` [${mapCodeToLabel(code)}]` : "";
        const label = `${npc.name} · ${quest.title}${mapLabel}`;
        options.push({ id: quest.id, label });
      }
    }
    options.sort((a, b) => a.label.localeCompare(b.label, "ko"));
    for (const opt of options) {
      const o = document.createElement("option");
      o.value = opt.id;
      o.textContent = opt.label;
      select.append(o);
    }
    // 이전 선택 복원 시도
    if (prev && options.some(o => o.id === prev)) {
      select.value = prev;
      currentEditQuestId = prev;
    } else {
      select.value = "";
      currentEditQuestId = null;
    }
    updateCoordEditorInfo();
  }

  function updateCoordEditorInfo() {
    if (!mapDom.coordEditorInfo) return;
    if (!currentEditQuestId) {
      mapDom.coordEditorInfo.textContent = "퀘스트를 선택하세요.";
      return;
    }
    const res = typeof getQuestById === "function" ? getQuestById(currentEditQuestId) : null;
    if (!res) {
      mapDom.coordEditorInfo.textContent = "퀘스트 정보를 찾을 수 없습니다.";
      return;
    }
    const pos = resolvePosition(res.quest);
    let total = 0;
    try {
      const store = (typeof window !== "undefined" && window.IMMUTABLE_POSITIONS) || {};
      let entry = store[currentEditQuestId];
      if (entry) {
        if (!Array.isArray(entry)) entry = [entry];
        total = entry.length;
      }
    } catch {}
    if (total > 0) {
      mapDom.coordEditorInfo.textContent = `저장된 좌표: ${total}개 · 대표 좌표: X ${pos.x}%, Y ${pos.y}%`;
    } else {
      mapDom.coordEditorInfo.textContent = `저장된 좌표 없음 · 임시 좌표: X ${pos.x}%, Y ${pos.y}%`;
    }
  }

  function enableCoordAdmin() {
    if (coordAdmin) return;
    coordAdmin = true;
    try { localStorage.setItem(ADMIN_FLAG_KEY, "1"); } catch {}
    initCoordEditor();
  }

  // 이전에 관리자 모드를 켰다면 자동 활성화
  try {
    if (localStorage.getItem(ADMIN_FLAG_KEY) === "1") {
      coordAdmin = true;
      initCoordEditor();
    }
  } catch {}

  // 맵 배경 적용기: jpg → png → webp 순 폴백, 복수형(s) → 단수형도 시도
  function applyMapBackgroundFor(mapName, labelText) {
    const candidates = [];
    const names = [mapName];
    if (mapName.endsWith("s")) {
      names.push(mapName.slice(0, -1));
    }
    // 특수 파일명 매핑 보정
    if (mapName === "streets") {
      names.push("street_of_tarkov");
    }
    if (mapName === "lab") {
      // The Lab는 층별 파일로 처리하므로 여기선 일반 맵 시도 안 함
      return;
    }
    for (const n of names) {
      candidates.push(`maps/${n}.jpg`);
      candidates.push(`maps/${n}.png`);
      candidates.push(`maps/${n}.webp`);
    }

    let idx = 0;
    function tryNext() {
      if (idx >= candidates.length) {
        // 모든 시도가 실패하면 배경 제거
        if (mapDom.canvas) mapDom.canvas.style.setProperty('--map-image', 'none');
        currentMap = mapName;
        // 현재 맵 코드는 유지되므로 필터는 그대로 적용되게 하고,
        // 혹시 이전 마커가 남아있지 않도록 재렌더
        renderMappedList();
        console.warn(`[맵 이미지] 파일을 찾을 수 없습니다: ${mapName} (시도: ${candidates.join(", ")})`);
        return;
      }
      const src = candidates[idx++];
      const testImg = new Image();
      testImg.onload = () => {
        if (mapDom.canvas) {
          mapDom.canvas.style.setProperty('--map-image', `url("${src}")`);
        }
        currentMap = mapName;
        currentMapName = mapName;
        renderMappedList();
        resetView();
      };
      testImg.onerror = tryNext;
      testImg.src = src;
    }
    tryNext();
  }

  // The Lab 층 배경 적용
  function applyFloorBackground(floorCode) {
    const candidates = [
      `maps/${floorCode}.jpg`,
      `maps/${floorCode}.png`,
      `maps/${floorCode}.webp`
    ];
    let idx = 0;
    function tryNext() {
      if (idx >= candidates.length) {
        if (mapDom.canvas) mapDom.canvas.style.setProperty('--map-image', 'none');
        renderMappedList();
        console.warn(`[맵 이미지] 파일을 찾을 수 없습니다: ${floorCode} (시도: ${candidates.join(", ")})`);
        return;
      }
      const src = candidates[idx++];
      const testImg = new Image();
      testImg.onload = () => {
        if (mapDom.canvas) {
          mapDom.canvas.style.setProperty('--map-image', `url("${src}")`);
        }
        renderMappedList();
        resetView();
      };
      testImg.onerror = tryNext;
      testImg.src = src;
    }
    tryNext();
  }

  function applyTransform() {
    if (!mapDom.canvas) return;
    mapDom.canvas.style.transform = `translate(${zoomState.panX}px, ${zoomState.panY}px) scale(${zoomState.zoom})`;
  }

  function clampPan() {
    const viewportW = mapDom.map.clientWidth;
    const viewportH = mapDom.map.clientHeight;
    const scaledW = viewportW * zoomState.zoom;
    const scaledH = viewportH * zoomState.zoom;
    const minX = Math.min(0, viewportW - scaledW);
    const minY = Math.min(0, viewportH - scaledH);
    if (zoomState.panX > 0) zoomState.panX = 0;
    if (zoomState.panY > 0) zoomState.panY = 0;
    if (zoomState.panX < minX) zoomState.panX = minX;
    if (zoomState.panY < minY) zoomState.panY = minY;
  }

  function resetView() {
    zoomState.zoom = 1;
    zoomState.panX = 0;
    zoomState.panY = 0;
    applyTransform();
  }

  function zoomAt(pointX, pointY, factor) {
    const oldZoom = zoomState.zoom;
    const newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, oldZoom * factor));
    if (newZoom === oldZoom) return;
    // 포인터 고정 줌
    const cx = pointX - zoomState.panX;
    const cy = pointY - zoomState.panY;
    const scale = newZoom / oldZoom;
    zoomState.panX = pointX - cx * scale;
    zoomState.panY = pointY - cy * scale;
    zoomState.zoom = newZoom;
    clampPan();
    applyTransform();
  }

  function attachInteractions() {
    if (!mapDom.map) return;
    // 휠 줌
    mapDom.map.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = mapDom.map.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? ZOOM_STEP : (1 / ZOOM_STEP);
      zoomAt(x, y, factor);
    }, { passive: false });

    // 드래그 팬
    let dragging = false;
    let startX = 0, startY = 0;
    let startPanX = 0, startPanY = 0;
    mapDom.map.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startPanX = zoomState.panX;
      startPanY = zoomState.panY;
      mapDom.map.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      zoomState.panX = startPanX + dx;
      zoomState.panY = startPanY + dy;
      clampPan();
      applyTransform();
    });
    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      mapDom.map.style.cursor = '';
    });

    // 버튼 컨트롤
    if (mapDom.zoomInBtn) {
      mapDom.zoomInBtn.addEventListener('click', () => {
        const rect = mapDom.map.getBoundingClientRect();
        zoomAt(rect.width / 2, rect.height / 2, ZOOM_STEP);
      });
    }
    if (mapDom.zoomOutBtn) {
      mapDom.zoomOutBtn.addEventListener('click', () => {
        const rect = mapDom.map.getBoundingClientRect();
        zoomAt(rect.width / 2, rect.height / 2, 1 / ZOOM_STEP);
      });
    }
    if (mapDom.resetZoomBtn) {
      mapDom.resetZoomBtn.addEventListener('click', () => resetView());
    }
  }

  // 맵 선택/전환
  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mapTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mapName = tab.getAttribute('data-map');

      // 탭 클릭 즉시 현재 맵 코드 갱신 및 마커/리스트 재렌더
      currentMapName = mapName;
      if (mapDom.canvas) {
        // 이전 배경은 즉시 제거해 시각적 잔상 방지
        mapDom.canvas.style.setProperty('--map-image', 'none');
      }
      renderMappedList();

      // The Lab / Reserve / Shoreline: 층 하위 탭 표시 및 층/지하 배경 적용
      if (floorTabs) {
        if (mapName === "lab") {
          floorTabs.style.display = "";
          // Lab 전용 기본 설정 복원
          originalFloorConfigs.forEach(cfg => {
            cfg.el.style.display = "";
            cfg.el.setAttribute("data-floor", cfg.code);
            cfg.el.textContent = cfg.label;
          });
          // 첫 진입 또는 다른 맵에서 넘어온 경우 1F를 기본 선택
          if (!currentFloorCode || !String(currentFloorCode).startsWith("the_lap_")) {
            currentFloorCode = "the_lap_1f";
          }
          floorButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-floor') === currentFloorCode));
          applyFloorBackground(currentFloorCode);
        } else if (mapName === "reserve") {
          // Reserve: 지하 1층(B1) 전용 하위 탭 사용
          floorTabs.style.display = "";
          originalFloorConfigs.forEach((cfg, idx) => {
            if (idx === 0) {
              // 첫 번째 버튼을 Reserve B1로 재사용
              cfg.el.style.display = "";
              cfg.el.setAttribute("data-floor", "reserve_b1");
              cfg.el.textContent = "B1";
            } else {
              // 나머지 버튼은 숨김
              cfg.el.style.display = "none";
            }
            cfg.el.classList.remove("active");
          });
          // 기본 배경은 지상 Reserve 맵으로 유지
          applyMapBackgroundFor(mapName, tab.textContent);
        } else if (mapName === "shoreline") {
          // Shoreline: Labrynth 하위 맵 전용 하위 탭 사용
          floorTabs.style.display = "";
          originalFloorConfigs.forEach((cfg, idx) => {
            if (idx === 0) {
              // 첫 번째 버튼을 Labrynth로 재사용
              cfg.el.style.display = "";
              cfg.el.setAttribute("data-floor", "labrynth");
              cfg.el.textContent = "Labrynth";
            } else {
              // 나머지 버튼은 숨김
              cfg.el.style.display = "none";
            }
            cfg.el.classList.remove("active");
          });
          // 기본 배경은 Shoreline 맵으로 유지
          applyMapBackgroundFor(mapName, tab.textContent);
        } else {
          floorTabs.style.display = "none";
          // 일반 맵 배경 적용
          applyMapBackgroundFor(mapName, tab.textContent);
        }
      } else {
        // 일반 맵 배경 적용
        applyMapBackgroundFor(mapName, tab.textContent);
      }
    });
  });

  // 층 전환 버튼 핸들러
  if (floorButtons && floorButtons.length) {
    floorButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        floorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFloorCode = btn.getAttribute('data-floor');
        
        // Lab의 경우: 현재 맵 코드는 'lab' 상태 유지, 배경만 변경
        // Shoreline의 Labrynth 경우: currentMapName을 'labrynth'로 변경하여 마커 필터링
        if (currentFloorCode === "labrynth") {
          currentMapName = "labrynth";
        } else if (String(currentFloorCode).startsWith("the_lap_")) {
          // Lab 층은 currentMapName을 'lab'으로 유지
          currentMapName = "lab";
        } else if (currentFloorCode === "reserve_b1") {
          // Reserve B1은 currentMapName을 'reserve_b1'로 변경
          currentMapName = "reserve_b1";
        }
        
        applyFloorBackground(currentFloorCode);
      });
    });
  }

  // 상호작용 부착
  attachInteractions();
  // 초기 뷰
  resetView();

  // 첫 진입 시 Customs 맵을 기본 선택
  const defaultTab = document.querySelector('.map-tab[data-map="customs"]');
  if (defaultTab) {
    defaultTab.click();
  }

  // Ctrl+Shift+E로 좌표 편집 관리자 모드 진입 (비밀번호 필요)
  window.addEventListener("keydown", (e) => {
    if (!e.ctrlKey || !e.shiftKey || e.code !== "KeyE") return;
    const pwd = window.prompt("좌표 편집 도구 비밀번호를 입력하세요:");
    if (pwd == null) return;
    if (pwd === ADMIN_PASSWORD) {
      enableCoordAdmin();
      alert("좌표 편집 도구가 활성화되었습니다.");
    } else {
      alert("비밀번호가 올바르지 않습니다.");
    }
  });
});

function getWorldPercentFromClient(clientX, clientY) {
  const rect = mapDom.map.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const worldX = (x - zoomState.panX) / zoomState.zoom;
  const worldY = (y - zoomState.panY) / zoomState.zoom;
  const px = Math.max(0, Math.min(100, (worldX / rect.width) * 100));
  const py = Math.max(0, Math.min(100, (worldY / rect.height) * 100));
  return { x: Math.round(px * 100) / 100, y: Math.round(py * 100) / 100 };
}

// 좌표 내보내기/가져오기
function exportPositions() {
  const data = loadPositions();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quest_positions.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// 좌표 힌트 (맵 초기화 이후 등록)
document.addEventListener("DOMContentLoaded", () => {
  const tryAttach = () => {
    const mapEl = document.getElementById("map");
    const statusEl = document.getElementById("coordStatus");
    if (!mapEl || !statusEl) return;
    mapEl.addEventListener("mousemove", (e) => {
      const p = getWorldPercentFromClient(e.clientX, e.clientY);
      statusEl.textContent = `X: ${p.x}% · Y: ${p.y}%`;
      statusEl.style.display = "";
    });
    mapEl.addEventListener("mouseleave", () => { statusEl.style.display = "none"; });
  };
  tryAttach();
});
// 편집/내보내기/가져오기 기능 제거

