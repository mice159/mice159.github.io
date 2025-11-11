// 지도 중심 페이지 스크립트

const mapDom = {
  map: null,
  clearMarkersBtn: null,
  toggleGrid: null,
  legendList: null,
  mappedList: null,
  modal: null,
  modalBody: null,
  modalClose: null
};

const markerByQuestId = new Map();
let currentMapName = null; // 현재 선택된 맵 코드 (customs, woods, ...)

// 퀘스트 텍스트에서 맵 코드 추출 (quests.js와 동일 규칙)
function detectQuestMap(quest) {
  const text = `${quest.title || ""} ${quest.description || ""}`.toLowerCase();
  const patterns = [
    { code: "customs", re: /\bcustoms?\b/ },
    { code: "woods", re: /\bwoods?\b/ },
    { code: "factory", re: /\bfactory\b/ },
    { code: "reserve", re: /\breserve\b/ },
    { code: "lighthouse", re: /\blighthouse\b/ },
    { code: "shoreline", re: /\bshoreline\b/ },
    { code: "interchange", re: /\binterchange\b/ },
    { code: "streets", re: /\bstreets of tarkov\b|\bstreets\b/ },
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
    lab: "The Lab"
  };
  return labels[code] || code;
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

function resolvePosition(quest) {
  if (quest && quest.position && typeof quest.position.x === "number" && typeof quest.position.y === "number") {
    return quest.position;
  }
  const id = quest && quest.id ? quest.id : Math.random().toString(36).slice(2);
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  const col = hash % 7;
  const row = Math.floor((hash >> 3) % 6);
  const x = 10 + col * 12;
  const y = 20 + row * 10;
  return { x, y };
}

function renderLegend() {
  mapDom.legendList.innerHTML = "";
  for (const npc of npcs) {
    const li = createEl("li", "legend-item");
    const sw = createEl("span", "legend-swatch");
    sw.style.background = npc.color;
    const label = createEl("span", null, [document.createTextNode(npc.name)]);
    li.append(sw, label);
    mapDom.legendList.append(li);
  }
}

function addOrUpdateMarker(qid, npc, quest) {
  let marker = markerByQuestId.get(qid);
  if (!marker) {
    marker = createEl("div", "marker pulse");
    marker.setAttribute("data-quest-id", qid);
    const lbl = createEl("div", "marker-label");
    marker.append(lbl);
    mapDom.map.append(marker);
    markerByQuestId.set(qid, marker);
  }
  const order = typeof loadMappedArray === "function" ? loadMappedArray() : [];
  const idx = Math.max(0, order.indexOf(qid));
  const orderColor = (typeof npcColors !== "undefined" && Array.isArray(npcColors) && npcColors.length > 0)
    ? npcColors[idx % npcColors.length]
    : (npc && npc.color) || "#6ea8fe";
  marker.style.color = orderColor;
  const pos = resolvePosition(quest);
  marker.style.left = `${pos.x}%`;
  marker.style.top = `${pos.y}%`;
  marker.style.background = orderColor;
  const lbl = marker.querySelector(".marker-label");
  if (lbl) lbl.textContent = String(idx + 1);
  marker.classList.remove("pulse"); void marker.offsetWidth; marker.classList.add("pulse");
}

function removeMarker(qid) {
  const m = markerByQuestId.get(qid);
  if (m) m.remove();
  markerByQuestId.delete(qid);
}

function clearAll() {
  // 매핑 상태 비우고 마커 삭제
  const set = loadMappedSet();
  for (const id of Array.from(set)) removeFromMapped(id);
  for (const m of markerByQuestId.values()) m.remove();
  markerByQuestId.clear();
  renderMappedList();
}

function renderMappedList() {
  mapDom.mappedList.innerHTML = "";
  const set = loadMappedSet();

  // 기존 마커 모두 제거 후 현재 맵에 해당하는 것만 다시 그리기
  for (const m of markerByQuestId.values()) m.remove();
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

    const mapCode = detectQuestMap(quest);
    if (!currentMapName || mapCode !== currentMapName) continue;

    addOrUpdateMarker(questId, npc, quest);

    const state = getQuestState(questId);
    const card = createEl("div", "mapped-card");
    const head = createEl("div", "mapped-head");
    const left = createEl("div", "mapped-title");
    const order = typeof loadMappedArray === "function" ? loadMappedArray() : [];
    const idx = Math.max(0, order.indexOf(questId));
    const orderColor = (typeof npcColors !== "undefined" && Array.isArray(npcColors) && npcColors.length > 0)
      ? npcColors[idx % npcColors.length]
      : npc.color;
    const dot = createEl("span", "npc-dot"); dot.style.background = orderColor;
    const t = createEl("span", null, [document.createTextNode(`${npc.name} · ${quest.title}`)]);
    const kBadge = createKappaBadge(!!quest.requiresKappa);
    const orderBadge = createEl("span", "order-badge", [document.createTextNode(String(idx + 1))]);
    left.append(dot, t, kBadge, orderBadge);

    const actions = createEl("div", "quest-actions");
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

    actions.append(chkWrap, removeBtn);
    head.append(left, actions);

    const pos = resolvePosition(quest);
    const coord = createEl("div", "coord");
    coord.style.color = "#90a0b7"; coord.style.fontSize = "12px";
    coord.textContent = `좌표: ${pos.x}%, ${pos.y}%`;

    card.append(head, coord);
    card.addEventListener("click", () => openMappedQuestModal(npc, quest));
    card.addEventListener("mouseenter", () => addOrUpdateMarker(questId, npc, quest));
    mapDom.mappedList.append(card);
    shown++;
  }

  if (shown === 0) {
    const msg = currentMapName
      ? `현재 선택된 맵에 매핑된 퀘스트가 없습니다.`
      : `오른쪽 상단 탭에서 맵을 먼저 선택하세요.`;
    const empty = createEl("p", null, [document.createTextNode(msg)]);
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
  const kBadge = createKappaBadge(!!quest.requiresKappa);

  const mapCode = detectQuestMap(quest);
  const mapBadge = createEl("span", `map-badge${mapCode ? "" : " map-none"}`);
  mapBadge.textContent = mapCode ? mapCodeToLabel(mapCode) : "X";
  mapBadge.title = mapCode ? `이 퀘스트가 진행되는 맵: ${mapCodeToLabel(mapCode)}` : "특정 맵 없음/여러 맵";

  left.append(dot, title, kBadge, mapBadge);

  const actions = createEl("div", "quest-actions");
  const doneWrap = createEl("label", "chk-label");
  const doneChk = document.createElement("input"); doneChk.type = "checkbox"; doneChk.checked = !!getQuestState(quest.id).done;
  doneChk.addEventListener("change", () => { persistQuestState(quest.id, { done: doneChk.checked }); });
  doneWrap.append(doneChk, document.createTextNode(" 완료"));
  actions.append(doneWrap);

  head.append(left, actions);

  const desc = createEl("p", null, [document.createTextNode(quest.description || "")]);
  const pos = resolvePosition(quest);
  const coord = createEl("div", "coord"); coord.style.color = "#90a0b7"; coord.style.fontSize = "12px"; coord.textContent = `좌표: ${pos.x}%, ${pos.y}%`;

  if (typeof questDetails !== "undefined" && questDetails[quest.id] && Array.isArray(questDetails[quest.id].steps)) {
    const stepsWrap = createEl("div");
    const h = createEl("h3"); h.textContent = "무엇을 어떻게 해야 하나요"; h.style.fontSize = "14px"; h.style.margin = "10px 0 6px";
    const ul = createEl("ul"); ul.style.margin = "0"; ul.style.paddingLeft = "18px";
    for (const s of questDetails[quest.id].steps) {
      const li = createEl("li"); li.textContent = s; ul.append(li);
    }
    stepsWrap.append(h, ul);
    box.append(head, desc, coord, stepsWrap);
  } else {
    box.append(head, desc, coord);
  }

  mapDom.modalBody.append(box);
  mapDom.modal.classList.remove("hidden");
  mapDom.modal.setAttribute("aria-hidden", "false");
}

function initMapPage() {
  mapDom.map = document.getElementById("map");
  mapDom.clearMarkersBtn = document.getElementById("clearMarkersBtn");
  mapDom.toggleGrid = document.getElementById("toggleGrid");
  mapDom.legendList = document.getElementById("legendList");
  mapDom.mappedList = document.getElementById("mappedList");
  mapDom.modal = document.getElementById("mapQuestModal");
  mapDom.modalBody = document.getElementById("mapModalBody");
  mapDom.modalClose = document.getElementById("mapModalClose");

  renderLegend();
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

  // 맵 배경 적용기: jpg → png → webp 순 폴백, 복수형(s) → 단수형도 시도
  function applyMapBackgroundFor(mapName, labelText) {
    const candidates = [];
    const names = [mapName];
    if (mapName.endsWith("s")) {
      names.push(mapName.slice(0, -1));
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
        mapDom.map && mapDom.map.style.setProperty('--map-image', 'none');
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
        if (mapDom.map) {
          mapDom.map.style.setProperty('--map-image', `url("${src}")`);
        }
        currentMap = mapName;
        currentMapName = mapName;
        renderMappedList();
      };
      testImg.onerror = tryNext;
      testImg.src = src;
    }
    tryNext();
  }

  // 맵 선택/전환
  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mapTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mapName = tab.getAttribute('data-map');

      // 탭 클릭 즉시 현재 맵 코드 갱신 및 마커/리스트 재렌더
      currentMapName = mapName;
      if (mapDom.map) {
        // 이전 배경은 즉시 제거해 시각적 잔상 방지
        mapDom.map.style.setProperty('--map-image', 'none');
      }
      renderMappedList();

      // 다양한 확장자/이름을 폴백으로 시도하여 #map 배경에 적용
      applyMapBackgroundFor(mapName, tab.textContent);
    });
  });
});


