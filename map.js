// 지도 중심 페이지 스크립트

const mapDom = {
  map: null,
  clearMarkersBtn: null,
  toggleGrid: null,
  legendList: null,
  mappedList: null
};

const markerByQuestId = new Map();

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
    marker.style.color = npc.color;
    marker.setAttribute("data-quest-id", qid);
    const lbl = createEl("div", "marker-label");
    lbl.textContent = npc.name;
    marker.append(lbl);
    mapDom.map.append(marker);
    markerByQuestId.set(qid, marker);
  }
  const pos = resolvePosition(quest);
  marker.style.left = `${pos.x}%`;
  marker.style.top = `${pos.y}%`;
  marker.style.background = npc.color;
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
  if (set.size === 0) {
    const empty = createEl("p", null, [document.createTextNode("매핑된 퀘스트가 없습니다. 퀘스트 페이지에서 '맵에 표시'를 사용하세요.")]);
    empty.style.color = "#90a0b7";
    empty.style.fontSize = "13px";
    mapDom.mappedList.append(empty);
    return;
  }
  for (const questId of set) {
    const res = getQuestById(questId);
    if (!res) continue;
    const { npc, quest } = res;
    addOrUpdateMarker(questId, npc, quest);

    const state = getQuestState(questId);
    const card = createEl("div", "mapped-card");
    const head = createEl("div", "mapped-head");
    const left = createEl("div", "mapped-title");
    const dot = createEl("span", "npc-dot"); dot.style.background = npc.color;
    const t = createEl("span", null, [document.createTextNode(`${npc.name} · ${quest.title}`)]);
    const kBadge = createKappaBadge(!!quest.requiresKappa);
    left.append(dot, t, kBadge);

    const actions = createEl("div", "quest-actions");
    const chkWrap = createEl("label", "chk-label");
    const chk = document.createElement("input");
    chk.type = "checkbox"; chk.checked = !!state.done;
    chk.addEventListener("change", () => { persistQuestState(questId, { done: chk.checked }); });
    chkWrap.append(chk, document.createTextNode(" 완료"));

    const removeBtn = createEl("button", "btn ghost");
    removeBtn.textContent = "제거";
    removeBtn.addEventListener("click", () => {
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
    card.addEventListener("mouseenter", () => addOrUpdateMarker(questId, npc, quest));
    mapDom.mappedList.append(card);
  }
}

function setupEvents() {
  mapDom.clearMarkersBtn.addEventListener("click", clearAll);
  mapDom.toggleGrid.addEventListener("change", () => {
    mapDom.map.classList.toggle("show-grid", mapDom.toggleGrid.checked);
  });
}

function initMapPage() {
  mapDom.map = document.getElementById("map");
  mapDom.clearMarkersBtn = document.getElementById("clearMarkersBtn");
  mapDom.toggleGrid = document.getElementById("toggleGrid");
  mapDom.legendList = document.getElementById("legendList");
  mapDom.mappedList = document.getElementById("mappedList");

  renderLegend();
  setupEvents();
  renderMappedList();
}

document.addEventListener("DOMContentLoaded", () => {
  const mapTabs = document.querySelectorAll('.map-tab');
  const mapImage = document.getElementById('mapImage');
  const mapImageContainer = document.getElementById('mapImageContainer');
  let openMap = null;

  // 맵 선택/전환
  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mapTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mapName = tab.getAttribute('data-map');
      // 맵 이미지 경로 지정 (이미지는 public/maps/{map}.jpg 등으로 저장해야 함)
      mapImage.src = `maps/${mapName}.jpg`;
      mapImage.alt = `${tab.textContent} 맵`;
      mapImageContainer.style.display = 'flex';
      openMap = mapName;
    });
  });

  // 맵 이미지를 클릭하면 닫기
  mapImageContainer.addEventListener('click', (e) => {
    if(e.target === mapImageContainer) {
      mapImageContainer.style.display = 'none';
      if(openMap) {
        // 기존 상호작용 지도 다시 보여줌
        openMap = null;
      }
    }
  });
});


