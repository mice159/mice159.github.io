// 공통 데이터 및 저장 유틸

const STORAGE_KEYS = {
  questStates: "questStates_v1",
  mappedSet: "mappedQuests_v1"
};

const npcColors = [
  "#ff6b6b", "#ffd166", "#06d6a0", "#4cc9f0", "#a78bfa",
  "#f72585", "#90be6d", "#48cae4", "#f4a261", "#e9c46a"
];

const npcs = [
  { id: "prapor", name: "Prapor", color: npcColors[0], quests: [
    { id: "prapor_debut", title: "데뷔 (Debut)", description: "스캐브 5명 사살, MP-133 2정 건네주기", requiresKappa: true },
    { id: "prapor_search_mission", title: "수색 임무 (Search Mission)", description: "Woods에서 호송대·USEC 캠프 찾고 탈출", requiresKappa: true },
    { id: "prapor_checking", title: "검증 (Checking)", description: "Customs 유조차 회중시계 확보 및 제출", requiresKappa: true },
    { id: "prapor_shootout_picnic", title: "사격 피크닉 (Shootout Picnic)", description: "Woods에서 스캐브 15명 사살", requiresKappa: true },
    { id: "prapor_delivery_from_the_past", title: "과거에서 온 배달 (Delivery from the Past)", description: "Customs 문서 케이스 확보→Factory 휴게실에 보관", requiresKappa: true },
    { id: "prapor_bp_depot", title: "BP 연료 확보 (BP Depot)", description: "Customs 유조차 4곳 마커 설치", requiresKappa: true },
    { id: "prapor_bunker_part_1", title: "벙커 - 파트 1 (The Bunker - Part 1)", description: "Reserve 지하 벙커·제어실 찾고 탈출", requiresKappa: true },
    { id: "prapor_bunker_part_2", title: "벙커 - 파트 2 (The Bunker - Part 2)", description: "Reserve 벙커 출입문 여러 곳 확인", requiresKappa: true },
    { id: "prapor_bad_rep_evidence", title: "나쁜 평판의 증거 (Bad Rep Evidence)", description: "Customs 컨테이너 숙소에서 보안 케이스 0031", requiresKappa: true },
    { id: "prapor_ice_cream_cones", title: "아이스크림 콘 (Ice Cream Cones)", description: "레이드에서 6L31 60발 탄창 3개 확보/제출", requiresKappa: true },
    { id: "prapor_documents", title: "문서 (Documents)", description: "Reserve 군사 문서 #1~#3 확보 및 제출", requiresKappa: true },
    { id: "prapor_shaking_up_teller", title: "돈가방을 갖고 튀어라 (Shaking up the Teller)", description: "Customs 기숙사 203호 귀중품 회수", requiresKappa: true },
    { id: "prapor_punisher_part_1", title: "퍼니셔 - 파트 1", description: "Shoreline에서 AKM 계열로 스캐브 15명", requiresKappa: true },
    { id: "prapor_punisher_part_2", title: "퍼니셔 - 파트 2", description: "Shoreline에서 소음기 무기로 스캐브 12명+하프마스크 7 제출", requiresKappa: true },
    { id: "prapor_punisher_part_3", title: "퍼니셔 - 파트 3", description: "Customs에서 AKS-74U로 스캐브 25명", requiresKappa: true },
    { id: "prapor_punisher_part_4", title: "퍼니셔 - 파트 4", description: "Woods 샷건 스캐브 10, Shoreline PMC 10(특정 착용) 등", requiresKappa: true },
    { id: "prapor_punisher_part_5", title: "퍼니셔 - 파트 5", description: "특정 무기 획득·제출 및 PMC 처치 조건", requiresKappa: true },
    { id: "prapor_punisher_part_6", title: "퍼니셔 - 파트 6", description: "SVD로 PMC 10, 양 진영 태그 제출 등", requiresKappa: true },
    { id: "prapor_anesthesia", title: "마취 (Anesthesia)", description: "Shoreline 거래 지점 3곳 마킹 및 탈출", requiresKappa: true },
    { id: "prapor_grenadier", title: "척탄병 (Grenadier)", description: "수류탄으로 PMC 8명 사살", requiresKappa: true },
    { id: "prapor_insomnia", title: "불면증 (Insomnia)", description: "22~05시에 PMC 30명 사살(Factory 제외)", requiresKappa: true },
    { id: "prapor_test_drive_part_1", title: "시범운용 - 파트 1 (Test Drive - Part 1)", description: "REAP-IR M1A로 60m+ PMC 5명", requiresKappa: true },
    { id: "prapor_test_drive_part_2", title: "시범운용 - 파트 2 (Test Drive - Part 2)", description: "소음기 SR-2M으로 PMC 20명", requiresKappa: false },
    { id: "prapor_perfect_mediator", title: "완벽한 중재자 (Perfect Mediator)", description: "주요 트레이더 우호도 4레벨 달성", requiresKappa: true },
    { id: "prapor_polikhim_hobo", title: "폴리킴의 방랑자 (Polikhim Hobo)", description: "Customs에서 스캐브 25명", requiresKappa: true },
    { id: "prapor_regulated_materials", title: "규제품목 (Regulated Materials)", description: "탱크 배터리/OFZ 포탄 획득·제출", requiresKappa: true },
    { id: "prapor_big_customer", title: "큰 손 (Big Customer)", description: "Customs 화학물 차량 마킹 후 탈출", requiresKappa: false },
    { id: "prapor_no_offence", title: "악의 없음 (No Offence)", description: "M67 수류탄 10개 제출", requiresKappa: false },
    { id: "prapor_capturing_outposts", title: "요충지 탈환 (Capturing Outposts)", description: "세 지역 스캐브 기지에서 PMC 각 8명", requiresKappa: false },
    { id: "prapor_intimidator", title: "협박자 (Intimidator)", description: "스캐브 헤드샷 40명", requiresKappa: true },
    { id: "prapor_escort", title: "호위 (Escort)", description: "여러 맵에서 PMC 4명씩 사살(특정 조건)", requiresKappa: false },
    { id: "prapor_easy_job_part_1", title: "쉬운 일 - 파트 1 (Easy Job - Part 1)", description: "Lighthouse 헬기 위치 마킹", requiresKappa: true },
    { id: "prapor_easy_job_part_2", title: "쉬운 일 - 파트 2 (Easy Job - Part 2)", description: "Lighthouse 헬기 주변 지역 확보", requiresKappa: true },
    { id: "prapor_our_own_land", title: "우리의 고향 (Our Own Land)", description: "Lighthouse에서 USEC PMC 20명+태그 제출", requiresKappa: false },
    { id: "prapor_reconnaissance", title: "정찰 (Reconnaissance)", description: "Lighthouse 사무실 건물 옥상 3곳 정찰", requiresKappa: true },
    { id: "prapor_youve_got_mail", title: "편지가 도착했습니다 (You've Got Mail)", description: "Streets 봉인된 편지 찾아 제출", requiresKappa: false },
    { id: "prapor_glory_to_cpsu", title: "소련공산당에 영광을 (Glory to CPSU)", description: "Streets 친구의 아파트 찾고 탈출", requiresKappa: false },
    { id: "prapor_best_job_in_the_world", title: "세계 최고의 직업 (Best Job in the World)", description: "AK-74로 100m+ 스캐브 30명", requiresKappa: false },
    { id: "prapor_kings_of_the_rooftops", title: "옥상의 지배자들 (Kings of the Rooftops)", description: "Streets 옥상 저격수 10명 사살", requiresKappa: false },
    { id: "prapor_green_corridor", title: "Green Corridor", description: "Streets 화물 호송대/매복 지점 파악 후 탈출", requiresKappa: false }
  ]},
  { id: "therapist", name: "Therapist", color: npcColors[1], quests: [
    { id: "therapist_hippocratic_oath", title: "히포크라테스 선서 (Hippocratic Oath)", description: "500 달러 건네주기", requiresKappa: false },
    { id: "therapist_out_of_curiosity", title: "호기심으로부터 (Out of Curiosity)", description: "Customs 화학물 차량 찾기·마커 설치·탈출", requiresKappa: false },
    { id: "therapist_postman_pat_part_2", title: "행복배달부 팻아저씨 - 파트 2 (Postman Pat - Part 2)", description: "배달부 편지 테라피스트에게 건네주기", requiresKappa: true },
    { id: "therapist_seaside_vacation", title: "해변으로 떠난 휴가 (Seaside Vacation)", description: "Lighthouse에서 정보원 서류가방 찾고 제출", requiresKappa: true },
    { id: "therapist_an_apple_a_day", title: "하루에 사과 한개가 의사를 멀리하게 해준다 (An Apple a Day Keeps the Doctor Away)", description: "400,000 루블 건네주기", requiresKappa: true },
    { id: "therapist_decontamination_service", title: "청소부 (Decontamination Service)", description: "Interchange 특정 장비 착용, 근거리 스캐브 40명 사살", requiresKappa: true },
    { id: "therapist_painkiller", title: "진통제 (Painkiller)", description: "레이드에서 모르핀 4개 획득·제출", requiresKappa: true },
    { id: "therapist_shortage", title: "재고 부족 (Shortage)", description: "레이드에서 Salewa 3개 획득·제출", requiresKappa: true },
    { id: "therapist_car_repair", title: "자동차 수리 (Car Repair)", description: "레이드 자동차 배터리 4, 점화 플러그 8 획득·제출", requiresKappa: true },
    { id: "therapist_population_census", title: "인구조사 (Population Census)", description: "거주자 정보가 담긴 일지 획득·제출", requiresKappa: false },
    { id: "therapist_health_care_privacy_part_5", title: "의료 개인 정보 보호 - 파트 5 (Health Care Privacy - Part 5)", description: "Factory(야간) 지정 장소에 Gunpowder 'Kite' 3개 두기", requiresKappa: true },
    { id: "therapist_health_care_privacy_part_4", title: "의료 개인 정보 보호 - 파트 4 (Health Care Privacy - Part 4)", description: "건강 스킬 4레벨 도달", requiresKappa: false },
    { id: "therapist_health_care_privacy_part_3", title: "의료 개인 정보 보호 - 파트 3 (Health Care Privacy - Part 3)", description: "Shoreline 밴 차량 찾기·혈액 샘플 확보·제출·탈출", requiresKappa: true },
    { id: "therapist_health_care_privacy_part_2", title: "의료 개인 정보 보호 - 파트 2 (Health Care Privacy - Part 2)", description: "헬스 리조트 문서 입수·제출·탈출", requiresKappa: true },
    { id: "therapist_health_care_privacy_part_1", title: "의료 개인 정보 보호 - 파트 1 (Health Care Privacy - Part 1)", description: "Shoreline 구급차 3곳 마커 설치", requiresKappa: true },
    { id: "therapist_dangerous_road", title: "위험한 길 (Dangerous Road)", description: "Streets Primorsky Ave Taxi V-Ex로 탈출", requiresKappa: false },
    { id: "therapist_sanitary_standards_part_2", title: "위생 기준 - 파트 2 (Sanitary Standards - Part 2)", description: "레이드 가스 분석기 2개 획득·제출", requiresKappa: true },
    { id: "therapist_sanitary_standards_part_1", title: "위생 기준 - 파트 1 (Sanitary Standards - Part 1)", description: "레이드 가스 분석기 1개 획득·제출", requiresKappa: true },
    { id: "therapist_crisis", title: "위기 (Crisis)", description: "레이드 제세동기5·검안경5·LEDX3·약더미20·비타민10 획득·제출", requiresKappa: false },
    { id: "therapist_athlete", title: "운동선수 (Athlete)", description: "건강 스킬 10레벨 도달", requiresKappa: true },
    { id: "therapist_lost_contact", title: "연락 두절 (Lost Contact)", description: "Lighthouse 오두막(chalet) 실종자 찾고 탈출", requiresKappa: true },
    { id: "therapist_pharmacist", title: "약사 (Pharmacist)", description: "Customs 의료장비 가방 획득·테라피스트에게 제출", requiresKappa: true },
    { id: "therapist_trust_regain", title: "신뢰 회복 (Trust Regain)", description: "여러 Dorm/체크포인트/가스창고 키 제출", requiresKappa: false },
    { id: "therapist_general_wares", title: "식량 보급 (General Wares)", description: "레이드 작은 쇠고기 스튜 15개 획득·제출", requiresKappa: true },
    { id: "therapist_private_clinic", title: "사설 진료소 (Private Clinic)", description: "검안경·LEDX 획득·제출", requiresKappa: true },
    { id: "therapist_supply_plans", title: "보급 계획 (Supply Plans)", description: "Woods 제재소 숙소 보안 케이스 0052 입수·탈출·제출", requiresKappa: false },
    { id: "therapist_disease_history", title: "병력 (Disease History)", description: "Reserve 의무 기록 #1/#2 입수·제출", requiresKappa: true },
    { id: "therapist_operation_aquarius_part_2", title: "물병자리 작전 - 파트 2 (Operation Aquarius - Part 2)", description: "Customs에서 스캐브 15명 사살", requiresKappa: true },
    { id: "therapist_operation_aquarius_part_1", title: "물병자리 작전 - 파트 1 (Operation Aquarius - Part 1)", description: "Customs 기숙사 물 숨겨진 호실 찾고 탈출", requiresKappa: true },
    { id: "therapist_drug_trafficking", title: "마약 밀매 (Drug Trafficking)", description: "Lighthouse 숨겨진 마약 연구소 찾고 WI-FI 카메라 설치", requiresKappa: false },
    { id: "therapist_colleagues_part_3", title: "동료들 - 파트 3 (Colleagues - Part 3)", description: "Sanitar를 죽이지 않고 Labs 카드10·주사기들 획득·제출", requiresKappa: false },
    { id: "therapist_colleagues_part_2", title: "동료들 - 파트 2 (Colleagues - Part 2)", description: "Sanitar 외과 장비·검안경 획득·제출", requiresKappa: true },
    { id: "therapist_colleagues_part_1", title: "동료들 - 파트 1 (Colleagues - Part 1)", description: "리조트·부두·별장 그룹 찾고 탈출", requiresKappa: true },
    { id: "therapist_urban_medicine", title: "도시 약품 (Urban Medicine)", description: "Streets 화학 실험실 찾고, 약물 보관함 찾아 제출", requiresKappa: false }
  ]},
  { id: "skier", name: "Skier", color: npcColors[2], quests: [
    { id: "skier_supplier", title: "공급자 (Supplier)", description: "FIR Module-3M 방탄복, FIR TOZ-106 산탄총 제출", requiresKappa: true },
    { id: "skier_the_extortionist", title: "약탈자 (The Extortionist)", description: "Customs 보안 케이스 0048 회수·제출", requiresKappa: true },
    { id: "skier_stirrup", title: "소동 (Stirrup)", description: "권총으로 PMC 3명 사살", requiresKappa: true },
    { id: "skier_flash_drive", title: "USB에는 무엇이 들어 있을까? (What’s on the Flash Drive?)", description: "FIR USB 플래시 드라이브 2개 제출", requiresKappa: true },
    { id: "skier_golden_swag", title: "황금빛 스웩 (Golden Swag)", description: "Customs 황금 지뽀 라이터 획득 → 컨테이너에 두기", requiresKappa: true },
    { id: "skier_chemical_part_1", title: "화학 - 파트 1 (Chemical - Part 1)", description: "Customs 정보·증거 수집 및 제출", requiresKappa: true },
    { id: "skier_chemical_part_2", title: "화학 - 파트 2 (Chemical - Part 2)", description: "Customs 증거·정보 추가 수집 및 제출", requiresKappa: true },
    { id: "skier_chemical_part_3", title: "화학 - 파트 3 (Chemical - Part 3)", description: "Factory 화학물 주사기 획득·제출", requiresKappa: true },
    { id: "skier_chemical_part_4", title: "화학 - 파트 4 (Chemical - Part 4)", description: "Customs 화학물 차량 마커 설치·탈출", requiresKappa: false },
    { id: "skier_loyalty_buyout", title: "돈으로 이어진 관계 (Loyalty Buyout)", description: "1,000,000 루블 건네주기", requiresKappa: false },
    { id: "skier_vitamins_part_1", title: "비타민 - 파트 1 (Vitamins - Part 1)", description: "Shoreline/Interchange 화학 약품 보관함 3개 FIR 제출", requiresKappa: true },
    { id: "skier_vitamins_part_2", title: "비타민 - 파트 2 (Vitamins - Part 2)", description: "FIR 2M 방독면 4, 의료 채혈세트 3 제출", requiresKappa: true },
    { id: "skier_friend_west_part_1", title: "서쪽에서 온 친구 - 파트 1 (Friend from the West - Part 1)", description: "USEC PMC 7명 및 태그 7개 제출", requiresKappa: true },
    { id: "skier_friend_west_part_2", title: "서쪽에서 온 친구 - 파트 2 (Friend from the West - Part 2)", description: "6,000 달러 건네주기", requiresKappa: true },
    { id: "skier_informed_means_armed", title: "아는 것이 힘이다 (Informed Means Armed)", description: "Woods/Customs/Interchange에 WI-FI 카메라 3곳 설치", requiresKappa: true },
    { id: "skier_chumming", title: "떡밥 뿌리기 (Chumming)", description: "금목걸이 3곳 배치, 야간 Interchange PMC 5명 사살", requiresKappa: true },
    { id: "skier_silent_caliber", title: "소음기 사용법 (Silent Caliber)", description: "소음기 12게이지로 스캐브 20, PMC 10 사살", requiresKappa: true },
    { id: "skier_bullshit", title: "개소리 (Bullshit)", description: "Customs 가짜 USB 획득, Dorms에 SV-98/롤렉스/USB 숨기기, 진행 중 스캐브 금지", requiresKappa: true },
    { id: "skier_setup", title: "준비작업 (Setup)", description: "Customs 지정 장비 착용 후 PMC 15명 사살", requiresKappa: true },
    { id: "skier_flint", title: "부싯돌 (Flint)", description: "스트레스 저항력 스킬 5레벨 달성", requiresKappa: true },
    { id: "skier_lend_lease_part_1", title: "무기 대여 - 파트 1 (Lend-Lease - Part 1)", description: "Woods/Shoreline 모터 컨트롤러 3, 자이로 2 FIR 제출", requiresKappa: true },
    { id: "skier_kind_of_sabotage", title: "일종의 방해 공작 (Kind of Sabotage)", description: "보안 케이스 0052 제출", requiresKappa: false },
    { id: "skier_rigged_game", title: "조작된 게임 (Rigged Game)", description: "Shoreline 의료 상자 3곳 마커 설치·탈출", requiresKappa: true },
    { id: "skier_safe_corridor", title: "안전한 통로 (Safe Corridor)", description: "Reserve 지하 창고 스캐브 10명 사살", requiresKappa: true },
    { id: "skier_night_sweep", title: "야간 작전 (Night Sweep)", description: "FIR 컬티스트 칼 12개 제출", requiresKappa: false },
    { id: "skier_long_road", title: "긴 도로 (Long Road)", description: "Lighthouse 큰 도로 근처 스캐브 15명 사살", requiresKappa: true },
    { id: "skier_missing_cargo", title: "사라진 화물 (Missing Cargo)", description: "Lighthouse 추락 헬기·서류철 찾고 제출", requiresKappa: true },
    { id: "skier_top_secret", title: "일급 비밀 (Top Secret)", description: "Lighthouse 레이더기지 사령관실·군용 HDD 입수·제출", requiresKappa: false },
    { id: "skier_house_arrest_part_1", title: "가택 연금 - 파트 1 (House Arrest - Part 1)", description: "Streets에서 감금 장소 찾고 탈출", requiresKappa: false },
    { id: "skier_house_arrest_part_2", title: "가택 연금 - 파트 2 (House Arrest - Part 2)", description: "Streets 임시 교도소장 아파트 확인·탈출", requiresKappa: false },
    { id: "skier_debtor", title: "채무자 (Debtor)", description: "Streets에서 채무자 찾고 탈출", requiresKappa: false }
  ]},
  { id: "peacekeeper", name: "Peacekeeper", color: npcColors[3], quests: [
    { id: "peacekeeper_fishing_gear", title: "낚시 장비 (Fishing Gear)", description: "Shoreline 방파제 옆 숨겨둔 보트 찾기 / SV-98·멀티툴 숨기기 / 탈출", requiresKappa: true },
    { id: "peacekeeper_tigr_safari", title: "Tigr 사파리 (Tigr Safari)", description: "Customs Tigr 차량 3대 마커 설치 / 탈출", requiresKappa: true },
    { id: "peacekeeper_scrap_metal", title: "고철 (Scrap Metal)", description: "Shoreline T-90 전차 3대 마커 설치 / 탈출", requiresKappa: true },
    { id: "peacekeeper_eagle_eye", title: "매의 눈 (Eagle Eye)", description: "Shoreline UAV 추락지 2곳 / SAS 디스크 2개 회수·제출", requiresKappa: true },
    { id: "peacekeeper_humanitarian_supplies", title: "인도주의적 보급품 (Humanitarian Supplies)", description: "Shoreline 트럭 2대 마커 / MRE 5개 제출 / UN 군복 착용 스캐브 10명", requiresKappa: true },
    { id: "peacekeeper_the_cult_part_1", title: "광신도 - 파트 1 (The Cult - Part 1)", description: "Shoreline 실종된 정보원 찾기 / 탈출", requiresKappa: true },
    { id: "peacekeeper_the_cult_part_2", title: "광신도 - 파트 2 (The Cult - Part 2)", description: "Woods/Customs/Shoreline 의식 현장 4곳 마커", requiresKappa: true },
    { id: "peacekeeper_spa_tour_part_1", title: "스파 관광 - 파트 1 (Spa Tour - Part 1)", description: "Shoreline 12게이지 헤드샷으로 스캐브 7명", requiresKappa: true },
    { id: "peacekeeper_spa_tour_part_2", title: "스파 관광 - 파트 2 (Spa Tour - Part 2)", description: "Shoreline 헬리콥터/안전한 길목 마커 / 탈출", requiresKappa: true },
    { id: "peacekeeper_spa_tour_part_3", title: "스파 관광 - 파트 3 (Spa Tour - Part 3)", description: "WD-40, 세정제×2, 주름 호스×2, 표백제×2 제출", requiresKappa: true },
    { id: "peacekeeper_spa_tour_part_4", title: "스파 관광 - 파트 4 (Spa Tour - Part 4)", description: "리조트 동/서 발전기 찾기 / 탈출", requiresKappa: true },
    { id: "peacekeeper_spa_tour_part_5", title: "스파 관광 - 파트 5 (Spa Tour - Part 5)", description: "리조트 폐쇄 구역 열쇠 획득·제출", requiresKappa: true },
    { id: "peacekeeper_spa_tour_part_6", title: "스파 관광 - 파트 6 (Spa Tour - Part 6)", description: "8,000 달러 건네주기", requiresKappa: true },
    { id: "peacekeeper_spa_tour_part_7", title: "스파 관광 - 파트 7 (Spa Tour - Part 7)", description: "Morphine×4, 알칼리×2, 주름 호스×2, 5L 프로판 제출", requiresKappa: true },
    { id: "peacekeeper_cargo_x_part_1", title: "화물 X - 파트 1 (Cargo X - Part 1)", description: "Shoreline 동관 컴퓨터실 정보 입수·제출", requiresKappa: true },
    { id: "peacekeeper_cargo_x_part_2", title: "화물 X - 파트 2 (Cargo X - Part 2)", description: "드럼통 보관 방 찾기 / 두 번째 정보 입수·제출", requiresKappa: true },
    { id: "peacekeeper_cargo_x_part_3", title: "화물 X - 파트 3 (Cargo X - Part 3)", description: "Shoreline에 숨긴 화물 찾기 / 탈출", requiresKappa: true },
    { id: "peacekeeper_wet_job_part_1", title: "청부살인 - 파트 1 (Wet Job - Part 1)", description: "Shoreline 소음기 장착 M4A1/ADAR/TX-15로 스캐브 10명", requiresKappa: true },
    { id: "peacekeeper_wet_job_part_2", title: "청부살인 - 파트 2 (Wet Job - Part 2)", description: "어부의 거처 찾기 / 낚시 테이블 마커 / 탈출", requiresKappa: true },
    { id: "peacekeeper_wet_job_part_3", title: "청부살인 - 파트 3 (Wet Job - Part 3)", description: "Shoreline 아르티움의 자동차 찾기 / 탈출", requiresKappa: true },
    { id: "peacekeeper_wet_job_part_4", title: "청부살인 - 파트 4 (Wet Job - Part 4)", description: "리조트 세입자 목록 입수·제출", requiresKappa: true },
    { id: "peacekeeper_wet_job_part_5", title: "청부살인 - 파트 5 (Wet Job - Part 5)", description: "아르티움 관련 정보 입수·제출", requiresKappa: true },
    { id: "peacekeeper_mentor", title: "교관 (Mentor)", description: "50,000 유로 건네주기", requiresKappa: true },
    { id: "peacekeeper_wet_job_part_6", title: "청부살인 - 파트 6 (Wet Job - Part 6)", description: "저격소총 스킬 레벨 7 달성", requiresKappa: true },
    { id: "peacekeeper_the_guide", title: "안내자 (The Guide)", description: "모든 9개 맵에서 연속 생존 탈출", requiresKappa: true },
    { id: "peacekeeper_samples", title: "견본 (Samples)", description: "M.U.L.E./Obdolbos/Meldonin/AHF1-M/P22/L1/3-(b-TG) FIR 제출", requiresKappa: true },
    { id: "peacekeeper_terragroup_employee", title: "테라그룹 직원 (TerraGroup Employee)", description: "Labs 세니타 작업 공간·정보·파란 테이프 USB 제출", requiresKappa: true },
    { id: "peacekeeper_lend_lease_part_2", title: "무기 대여 - 파트 2 (Lend-Lease - Part 2)", description: "Virtex 2·COFDM 획득·제출", requiresKappa: true },
    { id: "peacekeeper_peacekeeping_mission", title: "평화 유지 임무 (Peacekeeping Mission)", description: "UN 장비 착용 상태로 5개 맵 스캐브 각 12명(총 60)", requiresKappa: true },
    { id: "peacekeeper_classified_technologies", title: "군사기밀 (Classified Technologies)", description: "Reserve T-90M 지휘관 제어 패널 제출", requiresKappa: true },
    { id: "peacekeeper_revision_reserve", title: "개정 작업 - 리저브 (Revision - Reserve)", description: "Reserve BMP-2×4, LAV III×1, T-90×1 마커 설치", requiresKappa: true },
    { id: "peacekeeper_the_cleaner", title: "청소부 (The Cleaner)", description: "Reserve 레이더 40명 사살", requiresKappa: false },
    { id: "peacekeeper_special_equipment", title: "Special Equipment", description: "VPX×5, RFID×5, Virtex×5, COFDM×5, Military flash drives×4 FIR 제출", requiresKappa: false },
    { id: "peacekeeper_cargo_x_part_4", title: "화물 X - 파트 4 (Cargo X - Part 4)", description: "Lighthouse 테라그룹 화물 마커 / 탈출", requiresKappa: true },
    { id: "peacekeeper_counteraction", title: "Counteraction", description: "Lighthouse에서 BEAR PMC 20명 사살·태그 20 제출", requiresKappa: false },
    { id: "peacekeeper_overpopulation", title: "Overpopulation", description: "Lighthouse 오두막 지역 스캐브 12명 사살", requiresKappa: true },
    { id: "peacekeeper_revision_lighthouse", title: "개정 작업 - 등대 (Revision - Lighthouse)", description: "BRDM×2, Stryker×2 마커 설치", requiresKappa: true },
    { id: "peacekeeper_trophies", title: "전리품 (Trophies)", description: "레벨 50+ BEAR 태그 20, USEC 태그 20 제출", requiresKappa: false },
    { id: "peacekeeper_revision_streets", title: "개정 작업 - 타르코프 시내 (Revision - Streets of Tarkov)", description: "Streets Stryker 3대 마커 / 탈출", requiresKappa: false },
    { id: "peacekeeper_road_closed", title: "도로 폐쇄 (Road Closed)", description: "Streets 화물 수송대·매복 지점 찾기 / 탈출", requiresKappa: false },
    { id: "peacekeeper_worst_job_in_the_world", title: "세계 최악의 직업 (Worst Job in the World)", description: "AR-15 시리즈로 100m+ 스캐브 30명", requiresKappa: false },
    { id: "peacekeeper_your_car_needs_service", title: "당신의 차량에 서비스가 필요합니다 (Your Car Needs a Service)", description: "Streets 카 딜러십 매니저 사무실 디지털 저장 장치 제출", requiresKappa: false }
  ]},
  { id: "mechanic", name: "Mechanic", color: npcColors[4], quests: [
    { id: "mechanic_introduction", title: "소개 (Introduction)", description: "Woods에서 예거 캠프·암호 메시지 확보·제출", requiresKappa: true },
    { id: "mechanic_gunsmith_part_1", title: "건스미스 - 파트 1 (Gunsmith - Part 1)", description: "MP-133 개조", requiresKappa: true },
    { id: "mechanic_gunsmith_part_2", title: "건스미스 - 파트 2 (Gunsmith - Part 2)", description: "AKS-74U 개조" },
    { id: "mechanic_gunsmith_part_3", title: "건스미스 - 파트 3 (Gunsmith - Part 3)", description: "MP5 개조" },
    { id: "mechanic_gunsmith_part_4", title: "건스미스 - 파트 4 (Gunsmith - Part 4)", description: "OP-SKS 개조" },
    { id: "mechanic_gunsmith_part_5", title: "건스미스 - 파트 5 (Gunsmith - Part 5)", description: "Remington 870 개조" },
    { id: "mechanic_gunsmith_part_6", title: "건스미스 - 파트 6 (Gunsmith - Part 6)", description: "AKM 개조" },
    { id: "mechanic_gunsmith_part_7", title: "건스미스 - 파트 7 (Gunsmith - Part 7)", description: "M4A1 개조" },
    { id: "mechanic_gunsmith_part_8", title: "건스미스 - 파트 8 (Gunsmith - Part 8)", description: "AKS-74N 개조" },
    { id: "mechanic_gunsmith_part_9", title: "건스미스 - 파트 9 (Gunsmith - Part 9)", description: "P226R 개조" },
    { id: "mechanic_gunsmith_part_10", title: "건스미스 - 파트 10 (Gunsmith - Part 10)", description: "AK-105 개조" },
    { id: "mechanic_gunsmith_part_11", title: "건스미스 - 파트 11 (Gunsmith - Part 11)", description: "KRISS Vector 9x19 개조" },
    { id: "mechanic_gunsmith_part_12", title: "건스미스 - 파트 12 (Gunsmith - Part 12)", description: "SIG MPX 개조" },
    { id: "mechanic_gunsmith_part_13", title: "건스미스 - 파트 13 (Gunsmith - Part 13)", description: "R11 RSASS 개조" },
    { id: "mechanic_gunsmith_part_14", title: "건스미스 - 파트 14 (Gunsmith - Part 14)", description: "HK 416A5 개조" },
    { id: "mechanic_gunsmith_part_15", title: "건스미스 - 파트 15 (Gunsmith - Part 15)", description: "AS VAL 개조" },
    { id: "mechanic_gunsmith_part_16", title: "건스미스 - 파트 16 (Gunsmith - Part 16)", description: "DVL-10 개조" },
    { id: "mechanic_gunsmith_part_17", title: "건스미스 - 파트 17 (Gunsmith - Part 17)", description: "AK-102 개조" },
    { id: "mechanic_gunsmith_part_18", title: "건스미스 - 파트 18 (Gunsmith - Part 18)", description: "AKMN 개조" },
    { id: "mechanic_gunsmith_part_19", title: "건스미스 - 파트 19 (Gunsmith - Part 19)", description: "SVDS 개조" },
    { id: "mechanic_gunsmith_part_20", title: "건스미스 - 파트 20 (Gunsmith - Part 20)", description: "M1A 개조" },
    { id: "mechanic_gunsmith_part_21", title: "건스미스 - 파트 21 (Gunsmith - Part 21)", description: "M700/M1911 개조" },
    { id: "mechanic_gunsmith_part_22", title: "건스미스 - 파트 22 (Gunsmith - Part 22)", description: "M4A1 개조" },
    { id: "mechanic_signal_part_1", title: "신호 - 파트 1 (Signal - Part 1)", description: "Shoreline 신호원 2곳 찾고 탈출", requiresKappa: true },
    { id: "mechanic_insider", title: "내부자 (Insider)", description: "Prapor 우호도 3레벨 달성", requiresKappa: true },
    { id: "mechanic_signal_part_2", title: "신호 - 파트 2 (Signal - Part 2)", description: "PC CPU×3, 충전지×3, PCB×3, 고장난 GPhone×3 제출", requiresKappa: true },
    { id: "mechanic_scout", title: "정찰 (Scout)", description: "Factory 탈출구 4곳 찾고 탈출", requiresKappa: true },
    { id: "mechanic_surplus_goods", title: "남는 물건 (Surplus Goods)", description: "Reserve MBT 내비게이션 시스템 회수·제출", requiresKappa: true },
    { id: "mechanic_back_door", title: "뒷문 (Back Door)", description: "Reserve 전원 탈출구 찾고 비밀 탈출", requiresKappa: true },
    { id: "mechanic_signal_part_3", title: "신호 - 파트 3 (Signal - Part 3)", description: "Shoreline 전파 교란기 3개 설치·탈출", requiresKappa: true },
    { id: "mechanic_signal_part_4", title: "신호 - 파트 4 (Signal - Part 4)", description: "기억력 스킬 레벨 4 도달", requiresKappa: true },
    { id: "mechanic_farming_part_1", title: "채굴 - 파트 1 (Farming - Part 1)", description: "Factory 제어장치 2곳 수리·탈출", requiresKappa: true },
    { id: "mechanic_farming_part_2", title: "채굴 - 파트 2 (Farming - Part 2)", description: "파워 케이블×2, T형 플러그×4, PCB×2 제출", requiresKappa: true },
    { id: "mechanic_bad_habit", title: "나쁜 습관 (Bad Habit)", description: "말보루/스트라이크/윌스턴 각 5 제출", requiresKappa: true },
    { id: "mechanic_farming_part_3", title: "채굴 - 파트 3 (Farming - Part 3)", description: "Customs 압류 창고·GPU 상자 회수·제출", requiresKappa: true },
    { id: "mechanic_farming_part_4", title: "채굴 - 파트 4 (Farming - Part 4)", description: "GPU×3, CPU 쿨러×8 제출", requiresKappa: true },
    { id: "mechanic_psycho_sniper", title: "사이코 저격수 (Psycho Sniper)", description: "저격소총 스킬 레벨 8", requiresKappa: true },
    { id: "mechanic_shooter_born_in_heaven", title: "천국에서 태어난 저격수 (A Shooter Born in Heaven)", description: "6개 맵 100m+ PMC 헤드샷 각 3명", requiresKappa: true },
    { id: "mechanic_import", title: "수입 (Import)", description: "UHF RFID 리더기, VPX 모듈 제출", requiresKappa: true },
    { id: "mechanic_chemistry_closet", title: "화학자의 옷장 (Chemistry Closet)", description: "Shoreline Sanitar 사무실 찾고 탈출", requiresKappa: true },
    { id: "mechanic_calibration", title: "영점 조정 (Calibration)", description: "100m+ PMC 20명 사살", requiresKappa: false },
    { id: "mechanic_the_courier", title: "배달부 (The Courier)", description: "Customs 2곳에 REAP-IR 숨기기", requiresKappa: false },
    { id: "mechanic_corporate_secrets", title: "기업 기밀 (Corporate Secrets)", description: "Lighthouse 하수처리장/펌프장 정보 수집·제출", requiresKappa: true },
    { id: "mechanic_energy_crisis", title: "에너지 위기 (Energy Crisis)", description: "Lighthouse 유조차 3대 마커 설치", requiresKappa: true },
    { id: "mechanic_broadcast_part_1", title: "Broadcast - Part 1", description: "Lighthouse 숨겨진 녹음 스튜디오 찾고 재머 설치", requiresKappa: true },
    { id: "mechanic_broadcast_part_2", title: "Broadcast - Part 2", description: "Streets 식료품점 방송 장소 찾고 탈출", requiresKappa: false }
  ]},
  { id: "ragman", name: "Ragman", color: npcColors[5], quests: [
    { id: "ragman_only_business", title: "사업적인 관계 (Only Business)", description: "Ragman 우호도 2레벨 달성", requiresKappa: true },
    { id: "ragman_make_ultra_great_again", title: "ULTRA를 다시 위대하게 (Make ULTRA Great Again)", description: "Interchange 스캐브 25명 사살", requiresKappa: true },
    { id: "ragman_big_sale", title: "매장 구경 (Big Sale)", description: "Interchange 5개 매장 방문 후 생존 탈출" },
    { id: "ragman_a_fuel_matter", title: "연료 문제 (A Fuel Matter)", description: "Reserve 연료 탱크 저장소 2곳 마커·탈출" },
    { id: "ragman_inventory_check", title: "재고 확인 (Inventory Check)", description: "Reserve 병영 특정 구역 5곳 확인·탈출" },
    { id: "ragman_blood_of_war_part_1", title: "전쟁의 피 - 파트 1 (The Blood of War - Part 1)", description: "Interchange 유조차 3대 마커·탈출" },
    { id: "ragman_dressed_to_kill", title: "폼생폼사 (Dressed to Kill)", description: "카우보이 모자×2, 우샨카×2 FIR 제출", requiresKappa: true },
    { id: "ragman_gratitude", title: "감사표시 (Gratitude)", description: "지정 4곳에 의류/악세서리 숨기기", requiresKappa: true },
    { id: "ragman_hot_delivery", title: "퀵서비스 (Hot Delivery)", description: "지정 3곳에 장비 숨기기", requiresKappa: true },
    { id: "ragman_scavenger", title: "스캐빈저 (Scavenger)", description: "확인 스킬 9레벨", requiresKappa: true },
    { id: "ragman_sales_night", title: "ULTRA 24시 (Sales Night)", description: "Interchange 7회 생존 탈출", requiresKappa: true },
    { id: "ragman_database_part_1", title: "데이터베이스 - 파트 1 (Database - Part 1)", description: "Interchange 3매장 화물 목록 제출", requiresKappa: true },
    { id: "ragman_database_part_2", title: "Database - Part 2", description: "Interchange OLI 운송장 서류 제출", requiresKappa: true },
    { id: "ragman_minibus", title: "미니버스 (Minibus)", description: "Interchange 미니버스 3대 마커·탈출", requiresKappa: true },
    { id: "ragman_sew_it_good_part_1", title: "솜씨 좋은 바느질 - 파트 1 (Sew it Good - Part 1)", description: "스키 마스크(눈구멍), 필그림 가방 FIR 제출", requiresKappa: true },
    { id: "ragman_blood_of_war_part_2", title: "전쟁의 피 - 파트 2 (The Blood of War - Part 2)", description: "연료 첨가제 4개 FIR 제출", requiresKappa: true },
    { id: "ragman_blood_of_war_part_3", title: "전쟁의 피 - 파트 3 (The Blood of War - Part 3)", description: "Woods 연료 저장소 3곳 마커·탈출", requiresKappa: true },
    { id: "ragman_sew_it_good_part_2", title: "솜씨 좋은 바느질 - 파트 2 (Sew it Good - Part 2)", description: "Gzhel-K 방탄복 내구도 구간별 제출", requiresKappa: true },
    { id: "ragman_key_to_success", title: "성공을 위한 열쇠 (The Key to Success)", description: "Interchange 의류 디자인 핸드북 제1/제2권 제출", requiresKappa: true },
    { id: "ragman_no_fuss_needed", title: "화낼 필요 없잖아 (No Fuss Needed)", description: "Therapist 우호도 3레벨", requiresKappa: true },
    { id: "ragman_the_stylish_one", title: "간지나는 놈 (The Stylish One)", description: "Killa 100회 사살", requiresKappa: false },
    { id: "ragman_supervisor", title: "감독관 (Supervisor)", description: "Goshan cash register key 제출", requiresKappa: true },
    { id: "ragman_sew_it_good_part_3", title: "솜씨 좋은 바느질 - 파트 3 (Sew it Good - Part 3)", description: "6B43 6A 방탄복 내구도 구간별 제출", requiresKappa: true },
    { id: "ragman_living_high_part_1", title: "잘 사는 건 죄가 아니야 - 파트 1 (Living High is Not a Crime - Part 1)", description: "사자상/말상/고양이/롤렉스/황금알 FIR 제출", requiresKappa: true },
    { id: "ragman_living_high_part_2", title: "Living High is Not a Crime - Part 2", description: "앤티크 찻주전자/꽃병/앵무새/까마귀 동상 FIR 제출", requiresKappa: true },
    { id: "ragman_sew_it_good_part_4", title: "Sew it Good - Part 4", description: "TV-109/106 리그×2, BlackRock×2 FIR 제출", requiresKappa: true },
    { id: "ragman_charisma_brings_success", title: "Charisma Brings Success", description: "카리스마 10레벨", requiresKappa: true },
    { id: "ragman_long_line", title: "Long Line", description: "Interchange ULTRA 몰 PMC 30명 사살", requiresKappa: true },
    { id: "ragman_booze", title: "Booze", description: "보드카×10, 위스키×10, 정제수 통×3, 맥주×20 제출", requiresKappa: true },
    { id: "ragman_audit", title: "Audit", description: "Streets 재무 기록 제출", requiresKappa: false },
    { id: "ragman_ballet_lover", title: "Ballet Lover", description: "Streets 발레마이스터 아파트 생존 탈출", requiresKappa: false },
    { id: "ragman_audiophile", title: "Audiophile", description: "Streets 음악가 모임 장소·각인 기타 피크 제출", requiresKappa: false },
    { id: "ragman_harley_forever", title: "Harley Forever", description: "Lighthouse/Steets 오토바이 마커·탈출", requiresKappa: false }
  ]},
  { id: "jaeger", name: "Jaeger", color: npcColors[6], quests: [
    { id: "jaeger_acquaintance", title: "Acquaintance", description: "FIR 전투식량/크루통/쇠고기 스튜 각 1 제출", requiresKappa: true },
    { id: "jaeger_survival_unprotected", title: "The Survivalist Path - Unprotected but Dangerous", description: "Woods에서 방탄복 없이 스캐브 5명" },
    { id: "jaeger_survival_thrifty", title: "The Survivalist Path - Thrifty", description: "Woods ZB-016/ZB-014에 식량·물 숨기기" },
    { id: "jaeger_survival_zhivchik", title: "The Survivalist Path - Zhivchik", description: "Factory 외 맵 완전 탈수 5분 생존 후 탈출" },
    { id: "jaeger_survival_wounded_beast", title: "The Survivalist Path - Wounded Beast", description: "고통 상태에서 스캐브 3명" },
    { id: "jaeger_survival_tough_guy", title: "The Survivalist Path - Tough Guy", description: "Woods 약품 미사용 스캐브 3명" },
    { id: "jaeger_courtesy_visit", title: "Courtesy Visit", description: "Shoreline 버려진 마을 3집 찾고 생존" },
    { id: "jaeger_nostalgia", title: "Nostalgia", description: "리조트 예거 방·사진 앨범 확보·제출" },
    { id: "jaeger_survival_cold_blooded", title: "The Survivalist Path - Cold Blooded", description: "떨림 상태 PMC 헤드샷 2" },
    { id: "jaeger_survival_junkie", title: "The Survivalist Path - Junkie", description: "각성제 효과로 Woods 스캐브 15" },
    { id: "jaeger_survival_eagle_owl", title: "The Survivalist Path - Eagle-Owl", description: "야시/열화상 없이 21:00-04:00 스캐브 6" },
    { id: "jaeger_survival_combat_medic", title: "The Survivalist Path - Combat Medic", description: "생명력 스킬 5" },
    { id: "jaeger_ambulance", title: "Ambulance", description: "FIR 제세동기 1, CMS 2 제출" },
    { id: "jaeger_huntsman_secured_perimeter", title: "The Huntsman Path - Secured Perimeter", description: "Factory 사무실 구역 PMC 6" },
    { id: "jaeger_reserve", title: "Reserve", description: "Reserve 식량 저장고 찾고 생존" },
    { id: "jaeger_huntsman_forest_cleaning", title: "The Huntsman Path - Forest Cleaning", description: "전 지역 스캐브 30" },
    { id: "jaeger_huntsman_controller", title: "The Huntsman Path - Controller", description: "기절 중 PMC 2 사살" },
    { id: "jaeger_huntsman_evil_watchman", title: "The Huntsman Path - Evil Watchman", description: "Customs Dorms PMC 5" },
    { id: "jaeger_fishing_place", title: "Fishing Place", description: "FIR Labs 키카드 2 제출" },
    { id: "jaeger_huntsman_trophy", title: "The Huntsman Path - Trophy", description: "Reshala 사살·황금 TT 제출" },
    { id: "jaeger_huntsman_justice", title: "The Huntsman Path - Justice", description: "Reshala 경호원 3 사살" },
    { id: "jaeger_huntsman_sellout", title: "The Huntsman Path - Sellout", description: "Killa 사살·헬멧 제출" },
    { id: "jaeger_huntsman_wood_keeper", title: "The Huntsman Path - Wood Keeper", description: "Shturman 사살·열쇠 제출" },
    { id: "jaeger_hunting_trip", title: "Hunting Trip", description: "지정 스코프 M700으로 Shturman 50m+ 사살" },
    { id: "jaeger_huntsman_factory_chief", title: "The Huntsman Path - Factory Chief", description: "Tagilla 사살·보스 모자 제출" },
    { id: "jaeger_huntsman_eraser_part_1", title: "The Huntsman Path - Eraser - Part 1", description: "Glukhar 사살" },
    { id: "jaeger_huntsman_eraser_part_2", title: "The Huntsman Path - Eraser - Part 2", description: "Raider 6 사살" },
    { id: "jaeger_tarkov_shooter_part_1", title: "The Tarkov Shooter - Part 1", description: "볼트액션 가늠쇠 40m+ 스캐브 5" },
    { id: "jaeger_tarkov_shooter_part_2", title: "The Tarkov Shooter - Part 2", description: "볼트액션 40m+ 다리3/헤드2" },
    { id: "jaeger_tarkov_shooter_part_3", title: "The Tarkov Shooter - Part 3", description: "볼트액션 25m 미만 PMC 3" },
    { id: "jaeger_tarkov_shooter_part_4", title: "The Tarkov Shooter - Part 4", description: "저격 스킬 3" },
    { id: "jaeger_tarkov_shooter_part_5", title: "The Tarkov Shooter - Part 5", description: "Customs 21:00-5:00 스캐브 8" },
    { id: "jaeger_tarkov_shooter_part_6", title: "The Tarkov Shooter - Part 6", description: "스나이퍼 스캐브 5" },
    { id: "jaeger_tarkov_shooter_part_7", title: "The Tarkov Shooter - Part 7", description: "소음기 볼트액션 45m+ PMC 5" },
    { id: "jaeger_tarkov_shooter_part_8", title: "The Tarkov Shooter - Part 8", description: "Woods 단일 레이드 PMC 3" },
    { id: "jaeger_shady_business", title: "Shady Business", description: "FIR USB 3 제출" },
    { id: "jaeger_sadist", title: "The Huntsman Path - Sadist", description: "Sanitar 사살", requiresKappa: false },
    { id: "jaeger_hunter", title: "Hunter", description: "Shturman 20회 사살", requiresKappa: false },
    { id: "jaeger_pest_control", title: "Pest Control", description: "Reserve 병영 스캐브 10" },
    { id: "jaeger_swift_one", title: "Swift One", description: "Woods 갑옷/헬멧 없이 PMC 15", requiresKappa: false },
    { id: "jaeger_relentless", title: "The Huntsman Path - Relentless", description: "보스 6종 사살 조건(활성 중 사망/탈주 불가)", requiresKappa: false },
    { id: "jaeger_the_hermit", title: "The Hermit", description: "Lighthouse 예거 친구 은신처·메시지 제출" },
    { id: "jaeger_outcasts", title: "The Huntsman Path - Outcasts", description: "Rogue USEC 10 사살" },
    { id: "jaeger_stray_dogs", title: "Stray Dogs", description: "Death Knight/Big Pipe/Birdeye 사살" },
    { id: "jaeger_delicious_sausage", title: "The Delicious Sausage", description: "Streets 4개 상점 정찰·소시지 제출" },
    { id: "jaeger_cease_fire", title: "Cease Fire!", description: "Streets Klimov Street 생존 탈출", requiresKappa: false },
    { id: "jaeger_slaughterhouse", title: "Slaughterhouse", description: "8맵 근접으로 스캐브 각 10(총80)", requiresKappa: false },
    { id: "jaeger_broadcast_part_3", title: "Broadcast - Part 3", description: "Streets 피 묻은 방송 장소 찾고 생존", requiresKappa: false },
    { id: "jaeger_broadcast_part_4", title: "Broadcast - Part 4", description: "Streets 컬티스트 모임 장소 찾고 생존", requiresKappa: false },
    { id: "jaeger_administrator", title: "The Huntsman Path - Administrator", description: "Streets 파인우드 호텔 약탈자 20 / 신호탄", requiresKappa: false }
  ]},
  { id: "fence", name: "Fence", color: npcColors[7], quests: [
    { id: "fence_q1", title: "Collector", description: "희귀 아이템 수집 제출", position: { x: 10, y: 86 } }
  ]},
  { id: "lightkeeper", name: "Lightkeeper", color: npcColors[8], quests: [
    { id: "lightkeeper_q1", title: "Compliance", description: "라이트하우스 관련 임무 수행", position: { x: 88, y: 72 } },
    { id: "lightkeeper_q2", title: "Trust", description: "신뢰 쌓기 임무", position: { x: 84, y: 66 } }
  ]}
];

function getQuestById(questId) {
  for (const npc of npcs) {
    const found = npc.quests.find(q => q.id === questId);
    if (found) return { npc, quest: found };
  }
  return null;
}

function loadQuestStates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.questStates);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function persistQuestState(questId, partial) {
  const states = loadQuestStates();
  const existing = states[questId] || { done: false, note: "" };
  states[questId] = { ...existing, ...partial };
  localStorage.setItem(STORAGE_KEYS.questStates, JSON.stringify(states));
}

function getQuestState(questId) {
  const states = loadQuestStates();
  return states[questId] || { done: false, note: "" };
}

function loadMappedSet() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.mappedSet);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(arr);
  } catch { return new Set(); }
}

// 매핑 순서 보존용 배열
function loadMappedArray() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.mappedSet);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveMappedSet(set) {
  localStorage.setItem(STORAGE_KEYS.mappedSet, JSON.stringify(Array.from(set)));
}

function addToMapped(questId) {
  const set = loadMappedSet();
  set.add(questId);
  saveMappedSet(set);
}

function removeFromMapped(questId) {
  const set = loadMappedSet();
  set.delete(questId);
  saveMappedSet(set);
}

function isMapped(questId) {
  return loadMappedSet().has(questId);
}


