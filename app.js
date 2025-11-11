// 데이터 모델: NPC 10명과 퀘스트들 (좌표는 % 기준)
const npcColors = [
  "#ff6b6b", "#ffd166", "#06d6a0", "#4cc9f0", "#a78bfa",
  "#f72585", "#90be6d", "#48cae4", "#f4a261", "#e9c46a"
];

const npcs = [
  {
    id: "npc1",
    name: "아린",
    color: npcColors[0],
    quests: [
      { id: "npc1_q1", title: "초원의 약초 수집", description: "초원 지대에서 약초 5개를 모으기", position: { x: 18, y: 32 } },
      { id: "npc1_q2", title: "낚시 도우미", description: "강가에서 낚시 도구 전달", position: { x: 25, y: 45 } }
    ]
  },
  {
    id: "npc2",
    name: "브루스",
    color: npcColors[1],
    quests: [
      { id: "npc2_q1", title: "늑대 소탕", description: "북쪽 숲 가장자리의 늑대 무리 처리", position: { x: 62, y: 20 } },
      { id: "npc2_q2", title: "보초 교대", description: "남문 보초 교대 전달", position: { x: 48, y: 66 } }
    ]
  },
  {
    id: "npc3",
    name: "세라",
    color: npcColors[2],
    quests: [
      { id: "npc3_q1", title: "약사 지원", description: "시장 구역에서 약재 전달", position: { x: 40, y: 58 } },
      { id: "npc3_q2", title: "분실물 찾기", description: "분수대 근처의 떨어진 펜던트", position: { x: 36, y: 52 } }
    ]
  },
  {
    id: "npc4",
    name: "다한",
    color: npcColors[3],
    quests: [
      { id: "npc4_q1", title: "사냥 훈련", description: "연습 사격장에서 과녁 명중", position: { x: 74, y: 38 } },
      { id: "npc4_q2", title: "물자 운반", description: "동쪽 전초기지로 보급품 운송", position: { x: 82, y: 44 } }
    ]
  },
  {
    id: "npc5",
    name: "엘라",
    color: npcColors[4],
    quests: [
      { id: "npc5_q1", title: "숲의 정령", description: "고목나무 아래 정령과 대화", position: { x: 20, y: 72 } },
      { id: "npc5_q2", title: "꽃 수선", description: "온실에서 시든 꽃 가꾸기", position: { x: 28, y: 64 } }
    ]
  },
  {
    id: "npc6",
    name: "피오",
    color: npcColors[5],
    quests: [
      { id: "npc6_q1", title: "광산 정찰", description: "폐광 입구 조사", position: { x: 58, y: 78 } },
      { id: "npc6_q2", title: "수레 수리", description: "남서쪽 고개에서 깨진 바퀴 교체", position: { x: 46, y: 82 } }
    ]
  },
  {
    id: "npc7",
    name: "가렌",
    color: npcColors[6],
    quests: [
      { id: "npc7_q1", title: "훈련 병참", description: "서쪽 훈련소에 화살 보급", position: { x: 10, y: 54 } },
      { id: "npc7_q2", title: "장비 점검", description: "무기고에서 방패 정비", position: { x: 14, y: 48 } }
    ]
  },
  {
    id: "npc8",
    name: "하린",
    color: npcColors[7],
    quests: [
      { id: "npc8_q1", title: "해안 경비", description: "남동쪽 해안 순찰", position: { x: 86, y: 76 } },
      { id: "npc8_q2", title: "범선 지원", description: "부두에서 정박 보조", position: { x: 90, y: 68 } }
    ]
  },
  {
    id: "npc9",
    name: "제이드",
    color: npcColors[8],
    quests: [
      { id: "npc9_q1", title: "사막 무역", description: "남서 사막의 대상인 접선", position: { x: 12, y: 88 } },
      { id: "npc9_q2", title: "오아시스 조사", description: "작은 오아시스 수원 확인", position: { x: 22, y: 84 } }
    ]
  },
  {
    id: "npc10",
    name: "카이",
    color: npcColors[9],
    quests: [
      { id: "npc10_q1", title: "탑 수호", description: "북동쪽 마법탑 경비", position: { x: 84, y: 16 } },
      { id: "npc10_q2", title: "수정 회수", description: "동쪽 동굴의 마력 수정 회수", position: { x: 72, y: 28 } }
    ]
  }
];

const STORAGE_KEY = "questStates_v1";

/** @type {Record<string, {done:boolean, note:string}>} */
let questStates = {};

const dom = {
  searchInput: null,
  npcList: null,
  map: null,
  clearMarkersBtn: null,
  toggleGrid: null,
  legendList: null
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    questStates = raw ? JSON.parse(raw) : {};
  } catch {
    questStates = {};
  }
}

function persistQuestState(questId, partial) {
  const existing = questStates[questId] || { done: false, note: "" };
  questStates[questId] = { ...existing, ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questStates));
}

function getQuestState(questId) {
  return questStates[questId] || { done: false, note: "" };
}

function createElement(tag, className, children) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (children) {
    for (const child of children) {
      el.append(child);
    }
  }
  return el;
}

// 지도 마커 관리
const markerByQuestId = new Map();

function addOrUpdateMarker({ questId, label, xPercent, yPercent, color }) {
  let marker = markerByQuestId.get(questId);
  if (!marker) {
    marker = createElement("div", "marker pulse");
    marker.style.color = color;
    marker.setAttribute("data-quest-id", questId);
    const lbl = createElement("div", "marker-label");
    lbl.textContent = label;
    marker.append(lbl);
    dom.map.append(marker);
    markerByQuestId.set(questId, marker);
  }
  marker.style.left = `${xPercent}%`;
  marker.style.top = `${yPercent}%`;
  marker.style.background = color;

  // 짧게 펄스 효과 재생
  marker.classList.remove("pulse");
  void marker.offsetWidth; // reflow
  marker.classList.add("pulse");
}

function clearAllMarkers() {
  for (const marker of markerByQuestId.values()) {
    marker.remove();
  }
  markerByQuestId.clear();
}

// NPC / 퀘스트 목록 렌더링
function renderNPCList(filterText, statusFilter) {
  dom.npcList.innerHTML = "";
  const normalized = (filterText || "").trim().toLowerCase();

  for (const npc of npcs) {
    const npcDetails = createElement("details", "npc");
    npcDetails.open = true;

    const summary = createElement("summary");
    const dot = createElement("span", "npc-dot");
    dot.style.background = npc.color;
    const title = createElement("h3");
    title.textContent = npc.name;
    summary.append(dot, title);

    const questList = createElement("div", "quest-list");

    for (const quest of npc.quests) {
      const state = getQuestState(quest.id);

      const targetText = `${npc.name} ${quest.title} ${quest.description}`.toLowerCase();
      const matchText = normalized === "" || targetText.includes(normalized);
      const matchStatus = statusFilter === "all" || (statusFilter === "done" && state.done) || (statusFilter === "active" && !state.done);
      if (!matchText || !matchStatus) continue;

      const questEl = createElement("div", "quest");
      const header = createElement("div", "quest-header");
      const questTitle = createElement("div", "quest-title");
      questTitle.textContent = quest.title;
      const actions = createElement("div", "quest-actions");

      const mapBtn = createElement("button", "btn");
      mapBtn.textContent = "맵에 표시";
      mapBtn.addEventListener("click", () => {
        addOrUpdateMarker({
          questId: quest.id,
          label: npc.name,
          xPercent: quest.position.x,
          yPercent: quest.position.y,
          color: npc.color
        });
      });

      const doneWrap = createElement("label", "chk-label");
      const doneChk = createElement("input");
      doneChk.type = "checkbox";
      doneChk.checked = !!state.done;
      doneChk.addEventListener("change", () => {
        persistQuestState(quest.id, { done: doneChk.checked });
      });
      doneWrap.append(doneChk, document.createTextNode(" 완료"));

      actions.append(mapBtn, doneWrap);
      header.append(questTitle, actions);

      const note = createElement("textarea", "quest-note");
      note.placeholder = "메모를 입력하세요 (자동 저장)";
      note.value = state.note || "";
      note.addEventListener("input", () => {
        persistQuestState(quest.id, { note: note.value });
      });

      const coord = createElement("div", "coord");
      coord.style.color = "#90a0b7";
      coord.style.fontSize = "12px";
      coord.textContent = `좌표: ${quest.position.x}%, ${quest.position.y}%`;

      questEl.append(header, note, coord);
      questList.append(questEl);
    }

    // 검색/필터 결과로 퀘스트가 하나도 없으면 NPC 카드 숨김
    if (questList.children.length === 0) continue;

    npcDetails.append(summary, questList);
    dom.npcList.append(npcDetails);
  }
}

function renderLegend() {
  dom.legendList.innerHTML = "";
  for (const npc of npcs) {
    const li = createElement("li", "legend-item");
    const sw = createElement("span", "legend-swatch");
    sw.style.background = npc.color;
    const label = createElement("span");
    label.textContent = npc.name;
    li.append(sw, label);
    dom.legendList.append(li);
  }
}

function setupEvents() {
  dom.clearMarkersBtn.addEventListener("click", clearAllMarkers);
  dom.toggleGrid.addEventListener("change", () => {
    dom.map.classList.toggle("show-grid", dom.toggleGrid.checked);
  });

  dom.searchInput.addEventListener("input", () => {
    const statusFilter = getSelectedStatusFilter();
    renderNPCList(dom.searchInput.value, statusFilter);
  });

  const radios = document.querySelectorAll('input[name="statusFilter"]');
  radios.forEach(r => r.addEventListener("change", () => {
    renderNPCList(dom.searchInput.value, getSelectedStatusFilter());
  }));
}

function getSelectedStatusFilter() {
  const checked = document.querySelector('input[name="statusFilter"]:checked');
  return checked ? checked.value : "all";
}

function init() {
  dom.searchInput = document.getElementById("searchInput");
  dom.npcList = document.getElementById("npcList");
  dom.map = document.getElementById("map");
  dom.clearMarkersBtn = document.getElementById("clearMarkersBtn");
  dom.toggleGrid = document.getElementById("toggleGrid");
  dom.legendList = document.getElementById("legendList");

  loadState();
  renderLegend();
  renderNPCList("", "all");
  setupEvents();
}

document.addEventListener("DOMContentLoaded", init);


