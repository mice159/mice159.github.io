// 좌표 고정 파일
// 이 파일에서 모든 퀘스트의 좌표를 관리합니다.
// 한 퀘스트에 여러 좌표가 필요하면 배열 요소를 복수로 추가하세요.
// 형식:
// window.IMMUTABLE_POSITIONS = {
//   "quest_id": [
//     { map: "customs", x: 0, y: 0 },
//     { map: "factory", x: 0, y: 0 }
//   ],
//   "another_quest": [
//     { map: "", x: 0, y: 0 } // map이 비어있으면 첫 좌표가 사용됩니다
//   ]
// };
window.IMMUTABLE_POSITIONS = window.IMMUTABLE_POSITIONS || {};

// 모든 퀘스트 아이디를 템플릿으로 자동 등록합니다.
// 각 퀘스트는 기본으로 [{ map: "", x: 0, y: 0 }] 한 개가 들어가며,
// 사용자가 map/x/y만 채워 넣으면 됩니다. (여러 좌표 필요 시 배열 요소를 추가)
// 사용 가능한 맵 코드: customs, woods, factory, reserve, lighthouse, shoreline, interchange, streets, ground_zero, lab
(function seedAllQuestIds() {
  try {
    const npcList = (typeof npcs !== "undefined" && Array.isArray(npcs))
      ? npcs
      : (Array.isArray(window.npcs) ? window.npcs : []);
    if (!npcList.length) return;
    for (const npc of npcList) {
      if (!npc || !Array.isArray(npc.quests)) continue;
      for (const q of npc.quests) {
        if (!q || !q.id) continue;
        if (!window.IMMUTABLE_POSITIONS[q.id]) {
          window.IMMUTABLE_POSITIONS[q.id] = [{ map: "", x: 0, y: 0 }];
          window.IMMUTABLE_POSITIONS["skier_the_extortionist"] = [{ map: "customs", x: 49.5, y: 72.6 }];
          window.IMMUTABLE_POSITIONS["mechanic_introduction"] = [{ map: "woods", x: 58.3, y: 58.7 }];
        }
      }
    }
  } catch {}
})();


