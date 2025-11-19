// 퀘스트 상세 단계 안내 (프라퍼 중심)
// key: data.js의 quest.id

const questDetails = {
  prapor_debut: {
    steps: [
      "모든 지역에서 스캐브 5명 사살",
      "MP-133 산탄총 2정 획득 후 프라퍼에게 건네주기"
    ]
  },
  prapor_search_mission: {
    steps: [
      "Woods에서 프라퍼 호송대 위치 찾기",
      "Woods의 USEC 임시 캠프 찾기",
      "살아서 레이드 탈출"
    ]
  },
  prapor_checking: {
    steps: [
      "Customs 트레일러 파크 인근 유조차에서 청동 회중시계 획득",
      "(선택) 유조차 열쇠 확보",
      "청동 회중시계를 프라퍼에게 건네주기"
    ]
  },
  prapor_shootout_picnic: {
    steps: [
      "Woods에서 스캐브 15명 사살"
    ]
  },
  prapor_delivery_from_the_past: {
    steps: [
      "Customs 빨간창고(감독관 사무실)에서 보안 케이스 확보",
      "Factory 3번 게이트 근처 2층 휴게실 금고에 케이스 둠",
      "Factory에서 살아서 탈출"
    ]
  },
  prapor_bp_depot: {
    steps: [
      "Customs 유조차 4곳에 MS2000 마커 설치",
      "살아서 레이드 탈출"
    ]
  },
  prapor_bunker_part_1: {
    steps: [
      "Reserve 지하 벙커 진입",
      "지하 벙커 제어실 찾기",
      "살아서 레이드 탈출"
    ]
  },
  prapor_bunker_part_2: {
    steps: [
      "Reserve 병원(화이트 비숍)로 향하는 벙커 출입문 찾기",
      "아카데미(블랙 비숍)로 향하는 출입문 중 하나 찾기",
      "1번 막사(블랙 폰)로 향하는 출입문 중 하나 찾기",
      "2번 막사(화이트 폰)로 향하는 출입문 중 하나 찾기",
      "항공관제소(화이트 킹)로 향하는 출입문 찾기",
      "살아서 레이드 탈출"
    ]
  },
  prapor_bad_rep_evidence: {
    steps: [
      "Customs 컨테이너 숙소에서 보안 케이스 0031 획득",
      "(선택) Factory 3층 복도 잠긴 방 확인",
      "보안 케이스 0031 프라퍼에게 전달",
      "Customs에서 살아서 탈출"
    ]
  },
  prapor_ice_cream_cones: {
    steps: [
      "레이드에서 6L31 60발 탄창 3개 획득 (Found in Raid)",
      "프라퍼에게 6L31 탄창 3개 제출"
    ]
  },
  prapor_documents: {
    steps: [
      "Reserve에서 군사 문서 #1, #2, #3 각 확보",
      "각 문서를 프라퍼에게 순차 제출"
    ]
  },
  prapor_shaking_up_teller: {
    steps: [
      "Customs 3층 기숙사 203호에서 귀중품 회수",
      "(선택) 214호 접근 경로 파악",
      "회수한 귀중품 프라퍼에게 제출"
    ]
  },
  prapor_punisher_part_1: {
    steps: [
      "Shoreline에서 AKM 계열 무기로 스캐브 15명 사살"
    ]
  },
  prapor_punisher_part_2: {
    steps: [
      "Shoreline에서 소음기 장착 무기로 스캐브 12명 사살",
      "레이드에서 하프 마스크 7개 획득 및 제출"
    ]
  },
  prapor_punisher_part_3: {
    steps: [
      "Customs에서 AKS-74U로 스캐브 25명 사살"
    ]
  },
  prapor_punisher_part_4: {
    steps: [
      "Woods에서 12게이지 산탄총으로 스캐브 10명",
      "Shoreline에서 발라클라바+스캐브 조끼 착용 후 PMC 10명",
      "Bars A-2607 나이프 5개 획득 및 제출"
    ]
  },
  prapor_punisher_part_5: {
    steps: [
      "레이드에서 AK-74N 획득 및 제출",
      "레이드에서 Colt M4A1 획득 및 제출",
      "레이드에서 PM 마카로프 권총 2정 획득 및 제출",
      "PACA+6B47 착용 상태로 PMC 10명 사살"
    ]
  },
  prapor_punisher_part_6: {
    steps: [
      "SVD로 PMC 10명 사살(Factory 제외)",
      "레이드에서 BEAR 인식표 7개 획득·제출",
      "레이드에서 USEC 인식표 7개 획득·제출"
    ]
  },
  prapor_anesthesia: {
    steps: [
      "Shoreline 거래 지점 3곳에 마커 설치",
      "살아서 레이드 탈출"
    ]
  },
  prapor_grenadier: { steps: ["수류탄으로 PMC 8명 사살"] },
  prapor_insomnia: { steps: ["22:00~05:00 사이(Factory 제외) PMC 30명 사살"] },
  prapor_test_drive_part_1: { steps: ["REAP-IR 장착 M1A로 60m+ PMC 5명 사살"] },
  prapor_test_drive_part_2: { steps: ["소음기 SR-2M + KP-SR2로 PMC 20명 사살"] },
  prapor_perfect_mediator: { steps: ["모든 주요 트레이더 우호도 4레벨 달성"] },
  prapor_polikhim_hobo: { steps: ["Customs에서 스캐브 25명 사살"] },
  prapor_regulated_materials: { steps: ["레이드에서 탱크 배터리 1개, OFZ 포탄 5개 획득 후 제출"] },
  prapor_big_customer: { steps: ["Customs 화학물 차량 찾기", "차량에 마커 설치", "살아서 탈출"] },
  prapor_no_offence: { steps: ["M67 수류탄 10개 구해 제출"] },
  prapor_capturing_outposts: { steps: ["Customs/Woods/Shoreline 스캐브 기지에서 PMC 8명씩 사살"] },
  prapor_intimidator: { steps: ["스캐브를 헤드샷으로 40명 사살"] },
  prapor_escort: { steps: ["Factory(주간)/Customs/Shoreline/Reserve/Woods/Interchange/The Lab 각 맵에서 PMC 4명 사살", "퀘스트 진행 중 사망/탈주 금지"] },
  prapor_easy_job_part_1: { steps: ["Lighthouse 하수처리장 헬리콥터 찾기", "헬리콥터에 마커 설치", "살아서 탈출"] },
  prapor_easy_job_part_2: { steps: ["Lighthouse 하수처리장 헬리콥터 주변 지역 확보"] },
  prapor_our_own_land: { steps: ["Lighthouse에서 USEC PMC 20명 사살", "레이드에서 발견한 USEC 인식표 20개 제출"] },
  prapor_reconnaissance: { steps: ["Lighthouse 사무실 건물 옥상 3곳 정찰", "살아서 탈출"] },
  prapor_youve_got_mail: { steps: ["Streets에서 봉인된 편지 찾기", "프라퍼에게 제출"] },
  prapor_glory_to_cpsu: { steps: ["Streets에서 프라퍼 친구의 아파트 위치 찾기", "살아서 탈출"] },
  prapor_best_job_in_the_world: { steps: ["AK-74 시리즈로 100m 이상의 스캐브 30명 사살"] },
  prapor_kings_of_the_rooftops: { steps: ["Streets 옥상 저격수 10명 사살", "살아서 탈출"] },
  prapor_green_corridor: { steps: ["Streets에서 화물 호송대 위치 파악", "매복 지점 파악", "살아서 탈출"] }
};

// Therapist 상세 단계 (테라피스트.csv 기반)
Object.assign(questDetails, {
  therapist_hippocratic_oath: { steps: ["500 달러 건네주기"] },
  therapist_out_of_curiosity: { steps: ["Customs 화학물 차량 찾기", "차량에 MS2000 마커 설치", "살아서 탈출"] },
  therapist_postman_pat_part_2: { steps: ["배달부에게서 찾은 편지 테라피스트에게 건네주기"] },
  therapist_seaside_vacation: { steps: ["Lighthouse 정보원 서류가방 찾기", "발견한 물건 건네주기"] },
  therapist_an_apple_a_day: { steps: ["400,000 루블 건네주기"] },
  therapist_decontamination_service: { steps: ["Interchange 특정 장비 착용", "근거리(≤60m)에서 스캐브 40명 사살"] },
  therapist_painkiller: { steps: ["레이드에서 Morphine 4개 획득", "Morphine 4개 건네주기"] },
  therapist_shortage: { steps: ["레이드에서 Salewa 3개 획득", "Salewa 3개 건네주기"] },
  therapist_car_repair: { steps: ["레이드에서 자동차 배터리 4개·점화 플러그 8개 획득", "각각 건네주기"] },
  therapist_population_census: { steps: ["거주자 정보 일지 획득", "일지 건네주기"] },
  therapist_health_care_privacy_part_5: { steps: ["Factory(야간) 지정 장소 찾기", "Gunpowder 'Kite' 3개 두기"] },
  therapist_health_care_privacy_part_4: { steps: ["건강 스킬 4레벨 도달"] },
  therapist_health_care_privacy_part_3: { steps: ["Shoreline 밴 차량 찾기", "혈액 샘플 획득", "샘플 건네주기", "살아서 탈출"] },
  therapist_health_care_privacy_part_2: { steps: ["헬스 리조트 방 조사", "테라그룹 문서 입수", "입수한 정보 건네주기", "살아서 탈출"] },
  therapist_health_care_privacy_part_1: { steps: ["Shoreline 구급차 3곳 찾아 MS2000 마커 설치"] },
  therapist_dangerous_road: { steps: ["Streets Primorsky Ave Taxi V-Ex로 탈출"] },
  therapist_sanitary_standards_part_2: { steps: ["레이드에서 가스 분석기 2개 획득", "2개 건네주기"] },
  therapist_sanitary_standards_part_1: { steps: ["레이드에서 가스 분석기 1개 획득", "1개 건네주기"] },
  therapist_crisis: { steps: ["휴대용 제세동기 5", "검안경 5", "LEDX 3", "Pile of meds 20", "OLOLO 10 획득", "모두 건네주기"] },
  therapist_athlete: { steps: ["건강 스킬 10레벨 도달"] },
  therapist_lost_contact: { steps: ["Lighthouse 오두막(chalet) 지역에서 실종자 찾기", "살아서 탈출"] },
  therapist_pharmacist: { steps: ["Customs 의료장비 가방 획득", "테라피스트에게 가방 건네주기"] },
  therapist_trust_regain: { steps: ["Dorm room 303 key", "ZB-014 key", "Military checkpoint key", "Gas station storage room key 건네주기"] },
  therapist_general_wares: { steps: ["레이드 작은 쇠고기 스튜 15개 획득", "15개 건네주기"] },
  therapist_private_clinic: { steps: ["검안경 획득", "LEDX 획득", "둘 다 건네주기"] },
  therapist_supply_plans: { steps: ["Woods 제재소 숙소에서 보안 케이스 0052 입수", "살아서 탈출", "케이스 건네주기"] },
  therapist_disease_history: { steps: ["Reserve에서 의무 기록 #1, #2 입수", "건네주기"] },
  therapist_operation_aquarius_part_2: { steps: ["Customs에서 스캐브 15명 사살"] },
  therapist_operation_aquarius_part_1: { steps: ["Customs 기숙사 물 숨겨진 호실 찾기", "살아서 탈출"] },
  therapist_drug_trafficking: { steps: ["Lighthouse 숨겨진 마약 연구소 찾기", "WI-FI 카메라 설치"] },
  therapist_colleagues_part_3: { steps: ["Sanitar를 죽이지 않기", "Labs keycard 10개·AHF1-M·3-(b-TG) 주사기 획득·제출"] },
  therapist_colleagues_part_2: { steps: ["Sanitar 외과용 장비·검안경 획득·제출"] },
  therapist_colleagues_part_1: { steps: ["리조트/부두/별장으로 보내진 그룹 찾기", "살아서 탈출"] },
  therapist_urban_medicine: { steps: ["Streets 화학 실험실 찾기", "약물 보관함 찾기", "보관함 건네주기"] }
});

// BTR 운전병 상세 단계 (BTR 운전병.csv 기반)
Object.assign(questDetails, {
  btr_shipping_delay_part_2: {
    preview: ["Woods 보급 기지 창고/사무실/차고 정찰"],
    steps: [
      "Woods 보급 기지 창고 정찰",
      "Woods 보급 기지 사무실 정찰",
      "Woods 보급 기지 차고 정찰",
      "'A Helping Hand' 완료"
    ]
  },
  btr_hot_wheels: {
    preview: ["예비 BTR 바퀴 마킹"],
    steps: ["예비 BTR 바퀴를 찾아 MS2000 마커로 표시"]
  },
  btr_hot_wheels_retry: {
    preview: ["Reserve BTR 바퀴 마킹"],
    steps: ["Reserve에서 예비 BTR 바퀴를 찾아 MS2000 마커로 표시"]
  },
  btr_swift_retribution: {
    preview: ["Woods 스캐브 10 처치"],
    steps: ["Woods에서 스캐브 10 처치"]
  },
  btr_inevitable_response: {
    preview: ["Woods/Reserve 사살 + 수송 이동"],
    steps: [
      "Woods에서 스캐브 5 처치",
      "Woods→Reserve 수송 수단 이용",
      "Reserve에서 스캐브 5 처치"
    ]
  },
  btr_building_foundations: {
    preview: ["Ragman/Prapor/Peacekeeper에 판매"],
    steps: [
      "Ragman에게 아무 아이템 판매",
      "Prapor에게 아무 아이템 판매",
      "Peacekeeper에게 아무 아이템 판매"
    ]
  },
  btr_natural_exchange: {
    preview: ["Shoreline 밀수업자 기지 연료통 은닉"],
    steps: [
      "Shoreline 밀수업자 기지에 금속 연료통 1 은닉",
      "Shoreline 밀수업자 기지에 금속 연료통 2 은닉"
    ]
  },
  btr_ask_for_directions: {
    preview: ["Lighthouse 절벽 길 1~4 마킹"],
    steps: [
      "절벽 길 1 구간 MS2000 마커로 표시",
      "절벽 길 2 구간 MS2000 마커로 표시",
      "절벽 길 3 구간 MS2000 마커로 표시",
      "절벽 길 4 구간 MS2000 마커로 표시"
    ]
  },
  btr_battery_change_1: {
    preview: ["Tank battery 전달"],
    steps: ["레이드에서 Tank battery 6-STEN-140-M 전달"]
  },
  btr_battery_change_2: {
    preview: ["Tank battery 전달"],
    steps: ["레이드에서 Tank battery 6-STEN-140-M 전달"]
  },
  btr_protect_the_sky: {
    preview: ["Woods 패키지 수색/전달"],
    steps: [
      "Woods 지정 위치에서 패키지 수색",
      "패키지 전달"
    ]
  },
  btr_discombobulate: {
    preview: ["Woods RPG 상자 3곳 은닉"],
    steps: [
      "Woods 첫 번째 RPG 탄약 상자에 VOG-25 Khattabka 은닉",
      "Woods 두 번째 RPG 탄약 상자에 VOG-25 Khattabka 은닉",
      "Woods 세 번째 RPG 탄약 상자에 VOG-25 Khattabka 은닉"
    ]
  },
  btr_price_of_independence_1: {
    preview: ["복합 목표: 편지/수송/신호탄/사살/탈출"],
    steps: [
      "Customs에서 편지 확보",
      "Customs→Reserve 수송 수단 이용",
      "Reserve 군 사령부 3층에 편지 은닉",
      "Reserve→Woods 수송 수단 이용",
      "Woods 임의 대상 3 제거",
      "Woods→Lighthouse 수송 수단 이용",
      "Lighthouse 기차역 창고에서 노란 신호탄 발사",
      "Lighthouse 부두에서 노란 신호탄 발사",
      "목표 수행 중 스캐브 10 제거",
      "Lighthouse 생존 탈출"
    ]
  },
  btr_price_of_independence_2: {
    preview: ["복합 목표(조건 문구 차이)"],
    steps: [
      "Customs에서 편지 확보",
      "Customs→Reserve 수송 수단 이용",
      "Reserve 군 사령부 3층에 편지 은닉",
      "Reserve→Woods 수송 수단 이용",
      "Woods 임의 대상 3 제거",
      "Woods→Lighthouse 수송 수단 이용",
      "Lighthouse 기차역 창고에서 노란 신호탄 발사",
      "Lighthouse 부두에서 노란 신호탄 발사",
      "다른 목표 수행 중 스캐브 10 제거",
      "Lighthouse 생존 탈출"
    ]
  },
  btr_sensory_analysis_part_2: {
    preview: ["Moonshine 전달"],
    steps: ["Moonshine '맹렬한 도끼런' 전달"]
  }
});

// Skier 상세 단계 (스키어.csv 기반)
Object.assign(questDetails, {
  skier_supplier: { steps: ["FIR Module-3M 방탄복 건네주기", "FIR TOZ-106 산탄총 건네주기"] },
  skier_the_extortionist: { steps: ["Customs에서 보안 케이스 0048 획득", "회수한 물건 건네주기"] },
  skier_stirrup: { steps: ["권총을 사용하여 PMC 3명 사살"] },
  skier_flash_drive: { steps: ["레이드에서 USB 보안 플래시 드라이브 2개 획득", "2개 건네주기"] },
  skier_golden_swag: { steps: ["Customs 황금 지뽀 라이터 획득", "트레일러 주차장 입구 컨테이너에 라이터 두기"] },
  skier_chemical_part_1: { steps: ["Customs 과거 정보 찾기", "정보 건네주기", "수사 물건 찾기", "물건 건네주기"] },
  skier_chemical_part_2: { steps: ["Customs 증거 찾기·제출", "Customs 정보 찾기·제출"] },
  skier_chemical_part_3: { steps: ["Factory 화학물질 주사기 획득", "주사기 건네주기"] },
  skier_chemical_part_4: { steps: ["Customs 화학물 차량 찾기", "MS2000 마커 설치", "살아서 탈출"] },
  skier_loyalty_buyout: { steps: ["1,000,000 루블 건네주기"] },
  skier_vitamins_part_1: { steps: ["Shoreline/Interchange 화학 약품 보관함 3개 FIR 획득", "3개 건네주기"] },
  skier_vitamins_part_2: { steps: ["FIR 2M 방독면 4개·의료 채혈세트 3개 획득", "각각 건네주기"] },
  skier_friend_west_part_1: { steps: ["USEC PMC 7명 사살", "USEC 인식표 7개 획득·제출"] },
  skier_friend_west_part_2: { steps: ["6,000 달러 건네주기"] },
  skier_informed_means_armed: { steps: ["Woods/Customs/Interchange에 WI-FI 카메라 설치 (총 3곳)"] },
  skier_chumming: { steps: ["금목걸이 3개씩 3곳에 놓기 (Interchange / Customs Dorms / Woods 제재소)", "야간 Interchange에서 PMC 5명 사살"] },
  skier_silent_caliber: { steps: ["소음기 12게이지 산탄총으로 스캐브 20명", "PMC 10명 사살"] },
  skier_bullshit: { steps: ["Customs 가짜 정보 USB 획득", "Dorms 3층에 SV-98 / Roler / 가짜 USB 숨기기", "진행 중 스캐브 사살 금지"] },
  skier_setup: { steps: ["Customs에서 요구 장비 착용", "PMC 15명 사살"] },
  skier_flint: { steps: ["스트레스 저항력 스킬 5레벨 도달"] },
  skier_lend_lease_part_1: { steps: ["Woods/Shoreline 모터 컨트롤러 3·자이로 2 FIR 획득", "각각 건네주기"] },
  skier_kind_of_sabotage: { steps: ["보안 케이스 0052 건네주기"] },
  skier_rigged_game: { steps: ["Shoreline 헬스 리조트/주택/선착장 의약품 상자에 마커 설치", "살아서 탈출"] },
  skier_safe_corridor: { steps: ["Reserve 지하 창고에서 스캐브 10명 사살"] },
  skier_night_sweep: { steps: ["레이드에서 Cultist 칼 12개 획득", "12개 건네주기"] },
  skier_long_road: { steps: ["Lighthouse 큰 도로 근처를 돌아다니는 스캐브 15명 사살"] },
  skier_missing_cargo: { steps: ["Lighthouse 추락 헬리콥터 찾기", "정보원 서류철 찾기", "서류 건네주기"] },
  skier_top_secret: { steps: ["Lighthouse 레이더기지 사령관실 찾기", "비행 경로 HDD 입수", "HDD 건네주기"] },
  skier_house_arrest_part_1: { steps: ["Streets에서 감금 장소 찾기", "살아서 탈출"] },
  skier_house_arrest_part_2: { steps: ["Streets 임시 교도소장 아파트 찾기", "무슨 일 확인", "살아서 탈출"] },
  skier_debtor: { steps: ["Streets에서 채무자 찾기", "살아서 탈출"] }
});

// Peacekeeper 상세 단계 (Peacekeeper.csv 기반)
Object.assign(questDetails, {
  peacekeeper_fishing_gear: { steps: ["Shoreline 방파제 보트 찾기", "SV-98 숨기기", "멀티툴 숨기기", "살아서 탈출"] },
  peacekeeper_tigr_safari: { steps: ["Customs Tigr 차량 3대에 마커 설치", "살아서 탈출"] },
  peacekeeper_scrap_metal: { steps: ["Shoreline T-90 전차 3대에 마커 설치", "살아서 탈출"] },
  peacekeeper_eagle_eye: { steps: ["UAV 추락 지점 2곳 찾기", "SAS 디스크 2개 회수", "디스크 건네주기"] },
  peacekeeper_humanitarian_supplies: { steps: ["Shoreline 트럭 2대 마커 설치", "MRE 5개 구해 제출", "UN 군복 착용 후 Shoreline에서 스캐브 10명 사살"] },
  peacekeeper_the_cult_part_1: { steps: ["Shoreline 실종 정보원 찾기", "살아서 탈출"] },
  peacekeeper_the_cult_part_2: { steps: ["Woods/Customs/Shoreline 의식 현장 4곳에 마커 설치"] },
  peacekeeper_spa_tour_part_1: { steps: ["Shoreline 12게이지 산탄총으로 스캐브 헤드샷 7명"] },
  peacekeeper_spa_tour_part_2: { steps: ["Shoreline 헬리콥터/안전한 길목에 마커 설치", "살아서 탈출"] },
  peacekeeper_spa_tour_part_3: { steps: ["WD-40", "창문 세정제 ×2", "주름진 호스 ×2", "옥스 표백제 ×2 레이드 획득", "모두 제출"] },
  peacekeeper_spa_tour_part_4: { steps: ["리조트 동/서 건물 발전기 찾기", "살아서 탈출"] },
  peacekeeper_spa_tour_part_5: { steps: ["리조트 폐쇄된 구역 열쇠 획득", "열쇠 건네주기"] },
  peacekeeper_spa_tour_part_6: { steps: ["8,000 달러 건네주기"] },
  peacekeeper_spa_tour_part_7: { steps: ["Morphine ×4", "알칼리 ×2", "주름진 호스 ×2", "5L 프로판 탱크 획득", "모두 건네주기"] },
  peacekeeper_cargo_x_part_1: { steps: ["Shoreline 동관 컴퓨터실에서 정보 입수", "정보 건네주기"] },
  peacekeeper_cargo_x_part_2: { steps: ["드럼통 보관 방 찾기", "두 번째 정보 입수", "정보 건네주기"] },
  peacekeeper_cargo_x_part_3: { steps: ["Shoreline 테라그룹 화물 찾기", "살아서 탈출"] },
  peacekeeper_wet_job_part_1: { steps: ["Shoreline에서 소음기 장착 M4A1/ADAR/TX-15로 스캐브 10명 사살"] },
  peacekeeper_wet_job_part_2: { steps: ["어부의 거처 찾기", "낚시 테이블에 마커 설치", "살아서 탈출"] },
  peacekeeper_wet_job_part_3: { steps: ["Shoreline 아르티움의 자동차 찾기", "살아서 탈출"] },
  peacekeeper_wet_job_part_4: { steps: ["리조트 세입자 목록 입수", "목록 건네주기"] },
  peacekeeper_wet_job_part_5: { steps: ["아르티움이 했던 일에 대한 정보 입수", "정보 건네주기"] },
  peacekeeper_mentor: { steps: ["50,000 유로 건네주기"] },
  peacekeeper_wet_job_part_6: { steps: ["저격소총 스킬 레벨 7 도달"] },
  peacekeeper_the_guide: { steps: ["9개 맵 연속 생존(Survived) 탈출"] },
  peacekeeper_samples: { steps: ["M.U.L.E.", "Obdolbos", "Meldonin", "AHF1-M", "P22", "L1", "3-(b-TG) 레이드 획득", "모두 건네주기"] },
  peacekeeper_terragroup_employee: { steps: ["Labs 세니타 작업 공간 찾기", "작업 정보 입수", "파란 테이프 표시 플래시 드라이브 제출"] },
  peacekeeper_lend_lease_part_2: { steps: ["Virtex 2개 FIR", "COFDM 무선 송신기 FIR", "각각 건네주기"] },
  peacekeeper_peacekeeping_mission: { steps: ["UNTAR 헬멧 + MF-UNTAR 방탄복 + M4A1 착용", "5개 맵에서 스캐브 각 12명(총 60) 사살"] },
  peacekeeper_classified_technologies: { steps: ["Reserve T-90M 지휘관 제어 패널 입수", "제출"] },
  peacekeeper_revision_reserve: { steps: ["Reserve에서 BMP-2 ×4, LAV III ×1, T-90 ×1 마커 설치"] },
  peacekeeper_the_cleaner: { steps: ["Reserve 레이더 40명 사살"] },
  peacekeeper_special_equipment: { steps: ["VPX ×5", "UHF RFID ×5", "Virtex ×5", "COFDM ×5", "Military flash drives ×4 FIR 획득", "모두 건네주기"] },
  peacekeeper_cargo_x_part_4: { steps: ["Lighthouse 테라그룹 화물 위치 찾기", "마커 설치", "살아서 탈출"] },
  peacekeeper_counteraction: { steps: ["Lighthouse BEAR PMC 20명 사살", "BEAR 태그 20개 제출"] },
  peacekeeper_overpopulation: { steps: ["Lighthouse 오두막(cottage) 지역에서 스캐브 12명 사살"] },
  peacekeeper_revision_lighthouse: { steps: ["Lighthouse에서 BRDM ×2, Stryker ×2 마커 설치"] },
  peacekeeper_trophies: { steps: ["레벨 50+ BEAR 태그 20개", "USEC 태그 20개 제출"] },
  peacekeeper_revision_streets: { steps: ["Streets Stryker 3대 마커 설치", "살아서 탈출"] },
  peacekeeper_road_closed: { steps: ["Streets 화물 수송대 찾기", "매복 지점 찾기", "살아서 탈출"] },
  peacekeeper_worst_job_in_the_world: { steps: ["AR-15 시리즈로 100m 이상의 스캐브 30명 사살"] },
  peacekeeper_your_car_needs_service: { steps: ["Streets 카 딜러십 매니저 사무실에서 디지털 저장 장치 획득", "건네주기"] }
});

// Mechanic 상세 단계 (메카닉.csv 기반)
Object.assign(questDetails, {
  mechanic_introduction: { steps: ["Woods에서 예거 캠프 위치 찾기", "암호 메시지 획득", "메카닉에게 건네주기"] },
  mechanic_gunsmith_part_1: { steps: ["MP-133 개조 요구 사항 충족", "완성품 제출"] },
  mechanic_gunsmith_part_2: { steps: ["AKS-74U 개조", "제출"] },
  mechanic_gunsmith_part_3: { steps: ["MP5 개조", "제출"] },
  mechanic_gunsmith_part_4: { steps: ["OP-SKS 개조", "제출"] },
  mechanic_gunsmith_part_5: { steps: ["Remington 870 개조", "제출"] },
  mechanic_gunsmith_part_6: { steps: ["AKM 개조", "제출"] },
  mechanic_gunsmith_part_7: { steps: ["M4A1 개조", "제출"] },
  mechanic_gunsmith_part_8: { steps: ["AKS-74N 개조", "제출"] },
  mechanic_gunsmith_part_9: { steps: ["P226R 개조", "제출"] },
  mechanic_gunsmith_part_10: { steps: ["AK-105 개조", "제출"] },
  mechanic_gunsmith_part_11: { steps: ["KRISS Vector 9x19 개조", "제출"] },
  mechanic_gunsmith_part_12: { steps: ["SIG MPX 개조", "제출"] },
  mechanic_gunsmith_part_13: { steps: ["R11 RSASS 개조", "제출"] },
  mechanic_gunsmith_part_14: { steps: ["HK 416A5 개조", "제출"] },
  mechanic_gunsmith_part_15: { steps: ["AS VAL 개조", "제출"] },
  mechanic_gunsmith_part_16: { steps: ["DVL-10 개조", "제출"] },
  mechanic_gunsmith_part_17: { steps: ["AK-102 개조", "제출"] },
  mechanic_gunsmith_part_18: { steps: ["AKMN 개조", "제출"] },
  mechanic_gunsmith_part_19: { steps: ["SVDS 개조", "제출"] },
  mechanic_gunsmith_part_20: { steps: ["M1A 개조", "제출"] },
  mechanic_gunsmith_part_21: { steps: ["M700/M1911 개조", "제출"] },
  mechanic_gunsmith_part_22: { steps: ["M4A1 개조", "제출"] },
  mechanic_signal_part_1: { steps: ["Shoreline 신호원 2곳 찾기", "살아서 탈출"] },
  mechanic_insider: { steps: ["Prapor 우호도 3레벨 달성"] },
  mechanic_signal_part_2: { steps: ["PC CPU×3", "충전지×3", "인쇄 회로 기판×3", "고장난 GPhone×3 레이드 획득", "제출"] },
  mechanic_scout: { steps: ["Factory 탈출구 4곳 찾기", "살아서 탈출"] },
  mechanic_surplus_goods: { steps: ["Reserve MBT 통합 내비게이션 회수", "제출"] },
  mechanic_back_door: { steps: ["Reserve 전원 공급 탈출구 찾기", "비밀 탈출구로 탈출"] },
  mechanic_signal_part_3: { steps: ["Shoreline 전파 교란기 3개 설치", "탈출"] },
  mechanic_signal_part_4: { steps: ["기억력 스킬 4 도달"] },
  mechanic_farming_part_1: { steps: ["Factory 제어장치 2곳 공구세트로 수리", "탈출"] },
  mechanic_farming_part_2: { steps: ["파워 케이블×2", "T자형 플러그×4", "PCB×2 레이드 획득", "제출"] },
  mechanic_bad_habit: { steps: ["말보루/스트라이크/윌스턴 각 5개 레이드 획득", "제출"] },
  mechanic_farming_part_3: { steps: ["Customs 압류 창고 찾기", "GPU 상자 회수", "제출"] },
  mechanic_farming_part_4: { steps: ["GPU×3", "CPU 쿨러×8 레이드 획득", "제출"] },
  mechanic_psycho_sniper: { steps: ["저격소총 스킬 8 도달"] },
  mechanic_shooter_born_in_heaven: { steps: ["Woods/Reserve/Shoreline/Customs/Lighthouse/Streets에서 100m+ PMC 헤드샷 각 3명"] },
  mechanic_import: { steps: ["UHF RFID 리더기 1", "VPX 1 레이드 획득", "제출"] },
  mechanic_chemistry_closet: { steps: ["Shoreline Sanitar 사무실 찾기", "탈출"] },
  mechanic_calibration: { steps: ["100m+ PMC 20명 사살"] },
  mechanic_the_courier: { steps: ["Customs 2곳에 Trijicon REAP-IR 숨기기"] },
  mechanic_corporate_secrets: { steps: ["Lighthouse 하수처리장/펌프장 정보 찾기", "제출"] },
  mechanic_energy_crisis: { steps: ["Lighthouse 유조차 3대 마커 설치"] },
  mechanic_broadcast_part_1: { steps: ["Lighthouse 숨겨진 녹음 스튜디오 찾기", "전파 교란기 설치"] },
  mechanic_broadcast_part_2: { steps: ["Streets 식료품점 방송 장소 찾기", "탈출"] }
});

// Ragman 상세 단계 (래그맨.csv 기반)
Object.assign(questDetails, {
  ragman_only_business: { steps: ["Ragman 우호도 2레벨 달성"] },
  ragman_make_ultra_great_again: { steps: ["Interchange 스캐브 25명 사살"] },
  ragman_big_sale: { steps: ["Interchange AVOKADO/KOSTIN/tRend/DINO/TOP BRAND 방문", "생존 탈출"] },
  ragman_a_fuel_matter: { steps: ["Reserve 연료 탱크 저장소 2곳 마커", "생존 탈출"] },
  ragman_inventory_check: { steps: ["Reserve 동/남 병영 특정 구역 5곳 확인", "생존 탈출"] },
  ragman_blood_of_war_part_1: { steps: ["Interchange 유조차 3대 마커", "생존 탈출"] },
  ragman_dressed_to_kill: { steps: ["카우보이 모자×2", "우샨카×2 레이드 획득", "제출"] },
  ragman_gratitude: { steps: ["지정 4곳에 고스트 발라클라바/쉬마그/힙스터/원형 선글라스 숨기기"] },
  ragman_hot_delivery: { steps: ["지정 3곳에 콤택2/6B47/Gzhel-K 숨기기"] },
  ragman_scavenger: { steps: ["확인(Perception) 스킬 9레벨"] },
  ragman_sales_night: { steps: ["Interchange에서 7번 생존 탈출"] },
  ragman_database_part_1: { steps: ["Interchange Goshan/OLI/IDEA 화물 목록 입수", "제출"] },
  ragman_database_part_2: { steps: ["Interchange OLI 운송장 서류 입수", "제출"] },
  ragman_minibus: { steps: ["Interchange 미니버스 3대 마커", "생존 탈출"] },
  ragman_sew_it_good_part_1: { steps: ["스키 마스크(눈구멍) 1", "필그림 배낭 1 레이드 획득", "제출"] },
  ragman_blood_of_war_part_2: { steps: ["연료 첨가제 4 레이드 획득", "제출"] },
  ragman_blood_of_war_part_3: { steps: ["Woods 연료 저장소 3곳 마커", "생존 탈출"] },
  ragman_sew_it_good_part_2: { steps: ["Gzhel-K 0~50% 1개", "50~100% 1개 제출"] },
  ragman_key_to_success: { steps: ["Interchange 의류 디자인 핸드북 제1권", "제2권 레이드 획득", "제출"] },
  ragman_no_fuss_needed: { steps: ["Therapist 우호도 3레벨"] },
  ragman_the_stylish_one: { steps: ["Killa 100회 사살"] },
  ragman_supervisor: { steps: ["Goshan cash register key 제출"] },
  ragman_sew_it_good_part_3: { steps: ["6B43 6A 내구도 0~50% 1", "50~100% 1 제출"] },
  ragman_living_high_part_1: { steps: ["청동 사자×2", "말상×2", "고양이×1", "롤렉스×1", "황금알×1 레이드 획득", "제출"] },
  ragman_living_high_part_2: { steps: ["앤티크 찻주전자×3", "앤티크 꽃병×2", "앵무새×1", "까마귀×2 레이드 획득", "제출"] },
  ragman_sew_it_good_part_4: { steps: ["TV-109/106 리그×2", "BlackRock×2 레이드 획득", "제출"] },
  ragman_charisma_brings_success: { steps: ["카리스마 스킬 10 도달"] },
  ragman_long_line: { steps: ["Interchange ULTRA 몰에서 PMC 30 제거"] },
  ragman_booze: { steps: ["보드카×10", "댄 재키엘 위스키×10", "정제수 통×3", "Pevko Light×20 레이드 획득", "제출"] },
  ragman_audit: { steps: ["Streets 재무 기록 입수", "제출"] },
  ragman_ballet_lover: { steps: ["Streets 발레마이스터 아파트 찾기", "생존 탈출"] },
  ragman_audiophile: { steps: ["Streets 음악가 모임 장소 찾기", "각인 기타 피크 획득", "제출"] },
  ragman_harley_forever: { steps: ["Lighthouse 오토바이 2", "Streets 오토바이 1에 마커 설치", "생존 탈출"] }
});

// Lightkeeper 상세 단계 (등대지기.csv 기반)
Object.assign(questDetails, {
  lightkeeper_information_source: {
    preview: ["여러 맵 V-Ex/택시 탈출", "Streets Patrol-A 마킹"],
    steps: [
      "Woods Bridge V-Ex 탈출",
      "Customs Dorms V-Ex 탈출",
      "Interchange Power Station V-Ex 탈출",
      "Streets Primorsky Ave Taxi V-Ex 탈출",
      "Ground Zero Police Cordon V-Ex 탈출",
      "Streets Patrol-A 장갑차 1 위치 마킹",
      "Streets Patrol-A 장갑차 2 위치 마킹"
    ]
  },
  lightkeeper_missing_informant: {
    preview: ["Streets 은신처·일기", "등대지기에게 전달"],
    steps: [
      "Streets 정보 제공자의 백업 은신처 찾기",
      "정보 제공자의 일기 확보",
      "등대지기에게 전달"
    ]
  },
  lightkeeper_snatch: {
    preview: ["위조/원본 정보 교체", "Lighthouse/Reserve 수행"],
    steps: [
      "Lighthouse에서 탈출",
      "Lighthouse Rogue 기지에서 위조된 정보 획득",
      "Reserve 수리소에서 원본 정보 획득",
      "Reserve BMP-2 아래에 위조된 정보 숨기기",
      "원본 정보 등대지기에게 전달"
    ]
  },
  lightkeeper_return_the_favor: {
    preview: ["Woods PMC 15 처치", "블루 폴더 2곳 은닉"],
    steps: [
      "Woods 산악 지역 주변 PMC 15명 처치",
      "Woods USEC 캠프 검은 SUV에 TerraGroup 블루 폴더 숨기기",
      "Woods USEC 캠프 위성 안테나 근처 나무 상자에 블루 폴더 숨기기"
    ]
  },
  lightkeeper_payback: {
    preview: ["Glukhar 및 경호원 처치", "Cliff Descent 탈출"],
    steps: [
      "Glukhar 1명 처치",
      "Glukhar 경호원 6명 처치",
      "레이더 기지에서 노란 신호탄 발사",
      "Reserve Cliff Descent로 탈출"
    ]
  },
  lightkeeper_provocation: {
    preview: ["Interchange ASh-12 처치 20", "지정 물품 은닉·생존"],
    steps: [
      "Interchange Kiba Arms 주변에서 ASh-12로 대상 20명 처치",
      "Kiba Arms 상점 안에 Salty Dog 소시지 숨기기",
      "비밀 은신처에 Moonshine(맹렬한 도끼런) 숨기기",
      "비밀 컨테이너 은신처에 화장지 숨기기",
      "생존 탈출"
    ]
  },
  lightkeeper_following_the_bread_crumbs: {
    preview: ["Labs 구역 조사·테이프", "Raider 20 처치"],
    steps: [
      "Raider 20명 처치",
      "The Lab 무기 테스트 지역 조사",
      "The Lab 인간 실험실 조사",
      "The Lab 매니저 사무실에서 보안 테이프 획득",
      "테이프를 등대지기에게 전달"
    ]
  },
  lightkeeper_spotter: {
    preview: ["Concordia/프리모르스키 저격 위치", "장비 은닉·생존"],
    steps: [
      "Streets Concordia 건설 현장 조망 저격 위치 확인",
      "빨간 테이블 근처에 AI .338 소음기 숨기기",
      "프리모르스키에서 영화관 조망 저격 위치 확인",
      "Makhors 침대 아래에 Trijicon REAP-IR 숨기기",
      "생존 탈출"
    ]
  },
  lightkeeper_make_an_impression: {
    preview: ["볼트액션 숙련", "350m+ 스나스캐 10"],
    steps: [
      "볼트액션 라이플 기술 레벨 요구 달성",
      "350m 이상 거리에서 스나이퍼 스캐브 10명 처치"
    ]
  },
  lightkeeper_trouble_in_the_big_city: {
    preview: ["Streets 지역 확보 50", "마킹·신호탄·생존"],
    steps: [
      "Streets 화물 운송 지역 찾기",
      "적대 PMC로부터 지역 확보(50명)",
      "MS2000 마커로 화물 지역 표시",
      "장갑차 근처에서 노란 신호탄 발사",
      "생존 탈출"
    ]
  },
  lightkeeper_simple_side_job: {
    preview: ["Reserve 옥상 화물", "Woods 은닉"],
    steps: [
      "Reserve 군 병원 옥상에서 등대지기 화물 상자 획득",
      "Woods 스캐브 집에 화물 숨기기"
    ]
  },
  lightkeeper_order_from_outside: {
    preview: ["Reserve 재머", "Woods 은닉"],
    steps: [
      "Reserve 전기기계 창고에서 electronic jammer 확보",
      "Woods 지정 위치에 장치 은닉"
    ]
  },
  lightkeeper_keepers_word: {
    preview: ["미궁 3곳 나이프 은닉"],
    steps: [
      "Labyrinth(미궁) 첫 번째 특별 장소에 컬티스트 나이프 은닉",
      "두 번째 특별 장소에 컬티스트 나이프 은닉",
      "세 번째 특별 장소에 컬티스트 나이프 은닉"
    ]
  },
  lightkeeper_surprise_gift_pvp: {
    preview: ["Customs 은신처", "레프 정보 전달"],
    steps: [
      "Customs 옛 챔피언 은신처로 돌아가기",
      "레프의 불리한 정보 획득",
      "획득한 정보 건네주기"
    ]
  }
});

// Ref 상세 단계 (레프.csv 기반)
Object.assign(questDetails, {
  ref_easy_money_part_2: {
    preview: ["FIR 음료/식품 전달"],
    steps: [
      "레이드에서 발견한 음료 카테고리 아이템 건네주기",
      "레이드에서 발견한 식품 카테고리 아이템 건네주기"
    ]
  },
  ref_provide_viewership: {
    preview: ["Customs 공장 WI-FI 4", "내부 처치 15"],
    steps: [
      "Customs 산업 공장 내부에 WI-FI 카메라 4곳 설치",
      "Customs 산업 공장 내부에서 아무 대상 15 제거"
    ]
  },
  ref_balancing_part_1: {
    preview: ["AUG로 스캐브 5"],
    steps: [
      "어느 장소에서든 Steyr AUG를 사용해 스캐브 5 처치"
    ]
  },
  ref_balancing_part_2: {
    preview: ["PACA 착용 PMC 2"],
    steps: [
      "PACA 소프트 아머를 착용하고 PMC 2 처치"
    ]
  },
  ref_surprise: {
    preview: ["FIR Class4+ 플레이트 전달"],
    steps: [
      "레이드에서 발견한 Class 4 이상 방탄 플레이트 전달"
    ]
  },
  ref_create_a_distraction_part_1: {
    preview: ["Ground Zero 카페 TP-200 설치"],
    steps: [
      "Ground Zero 카페 2층에 TP-200 TNT 설치"
    ]
  },
  ref_create_a_distraction_part_2: {
    preview: ["Streets 경호원 2 처치"],
    steps: [
      "Streets에서 카반 또는 콜론타이의 경호원 2 처치"
    ]
  },
  ref_to_great_heights_part_1: {
    preview: ["Arena CheckPoint/LastHero 승리"],
    steps: [
      "Arena CheckPoint 또는 LastHero 모드 경기 승리"
    ]
  },
  ref_to_great_heights_part_2: {
    preview: ["Arena TeamFight/BlastGang/CheckPoint 승리"],
    steps: [
      "Arena TeamFight/BlastGang/CheckPoint 모드 중 한 모드에서 경기 승리"
    ]
  },
  ref_to_great_heights_part_3: {
    preview: ["Arena 3위 이상으로 승리"],
    steps: [
      "Arena TeamFight/BlastGang/CheckPoint 모드에서 3위 이상 기록하며 승리"
    ]
  },
  ref_to_great_heights_part_4: {
    preview: ["루블 기부, 6전 3승(4패 실패)"],
    steps: [
      "EFT 잔액에서 루블을 건네기",
      "Arena TeamFight/BlastGang/CheckPoint 6매치 중 3매치 승리(4패 시 실패)"
    ]
  },
  ref_to_great_heights_part_5: {
    preview: ["Arena 2연승 달성"],
    steps: [
      "Arena TeamFight/BlastGang/CheckPoint에서 2연속 매치 승리"
    ]
  },
  ref_against_the_conscience_part_1: {
    preview: ["Customs 방 조사·생존", "Shoreline 열쇠"],
    steps: [
      "Customs 옛 챔피언 방을 찾아 사건 파악",
      "Shoreline 밀수업자 기지에서 열쇠 확보",
      "해당 위치에서 생존 탈출"
    ]
  },
  ref_against_the_conscience_part_2: {
    preview: ["Arena 적 100 처치"],
    steps: [
      "Arena 모든 게임 모드에서 적 100 제거"
    ]
  },
  ref_decisions_decisions: {
    preview: ["레프 불리한 정보 획득·전달"],
    steps: [
      "레프의 불리한 정보를 찾아 획득",
      "정보를 레프에게 건네기"
    ]
  },
  ref_postponed_reward: {
    preview: ["Lega 메달 전달"],
    steps: [
      "Lega 메달을 레프에게 전달"
    ]
  }
});

// Jaeger 상세 단계 (예거.csv 기반)
Object.assign(questDetails, {
  jaeger_acquaintance: { steps: ["FIR Iskra", "Emelya", "Large beef stew 각 1 제출"] },
  jaeger_survival_unprotected: { steps: ["Woods 방탄복 없이 스캐브 5 사살"] },
  jaeger_survival_thrifty: { steps: ["Woods ZB-016/ZB-014에 Iskra/물 숨기기"] },
  jaeger_survival_zhivchik: { steps: ["Factory 외 맵 완전 탈수 5분 생존", "탈출"] },
  jaeger_survival_wounded_beast: { steps: ["고통 상태 스캐브 3 사살"] },
  jaeger_survival_tough_guy: { steps: ["Woods 약품 미사용 스캐브 3 사살"] },
  jaeger_courtesy_visit: { steps: ["Shoreline 버려진 마을 회장/어부/성직자 집 찾기", "생존 탈출"] },
  jaeger_nostalgia: { steps: ["리조트 예거 방 찾기", "사진 앨범 획득", "제출"] },
  jaeger_survival_cold_blooded: { steps: ["떨림 상태 PMC 헤드샷 2"] },
  jaeger_survival_junkie: { steps: ["각성제 효과로 Woods 스캐브 15 사살"] },
  jaeger_survival_eagle_owl: { steps: ["야시/열화상 없이 21:00-04:00 스캐브 6 사살"] },
  jaeger_survival_combat_medic: { steps: ["생명력 스킬 5"] },
  jaeger_ambulance: { steps: ["FIR 제세동기 1", "CMS 2 제출"] },
  jaeger_huntsman_secured_perimeter: { steps: ["Factory 사무실 구역 PMC 6"] },
  jaeger_reserve: { steps: ["Reserve 식량 저장고 찾기", "생존 탈출"] },
  jaeger_huntsman_forest_cleaning: { steps: ["전 지역 스캐브 30"] },
  jaeger_huntsman_controller: { steps: ["기절 중 PMC 2 사살"] },
  jaeger_huntsman_evil_watchman: { steps: ["Customs Dorms PMC 5"] },
  jaeger_fishing_place: { steps: ["FIR Labs 키카드 2 제출"] },
  jaeger_huntsman_trophy: { steps: ["Reshala 사살", "황금 TT 제출"] },
  jaeger_huntsman_justice: { steps: ["Reshala 경호원 3 사살"] },
  jaeger_huntsman_sellout: { steps: ["Killa 사살", "Killa 헬멧 제출"] },
  jaeger_huntsman_wood_keeper: { steps: ["Shturman 사살", "은닉처 열쇠 제출"] },
  jaeger_hunting_trip: { steps: ["지정 스코프 M700", "50m+ Shturman 사살"] },
  jaeger_huntsman_factory_chief: { steps: ["Tagilla 사살", "BOSS 모자 제출"] },
  jaeger_huntsman_eraser_part_1: { steps: ["Glukhar 사살"] },
  jaeger_huntsman_eraser_part_2: { steps: ["Raider 6 사살"] },
  jaeger_tarkov_shooter_part_1: { steps: ["볼트액션 가늠쇠 40m+ 스캐브 5"] },
  jaeger_tarkov_shooter_part_2: { steps: ["볼트액션 40m+ 다리 3회 / 헤드샷 2회"] },
  jaeger_tarkov_shooter_part_3: { steps: ["볼트액션 25m 미만 PMC 3"] },
  jaeger_tarkov_shooter_part_4: { steps: ["저격 소총 스킬 3"] },
  jaeger_tarkov_shooter_part_5: { steps: ["Customs 21:00-5:00 스캐브 8"] },
  jaeger_tarkov_shooter_part_6: { steps: ["스나이퍼 스캐브 5"] },
  jaeger_tarkov_shooter_part_7: { steps: ["소음기 볼트액션 45m+ PMC 5"] },
  jaeger_tarkov_shooter_part_8: { steps: ["Woods 단일 레이드 PMC 3"] },
  jaeger_shady_business: { steps: ["FIR USB 3 제출"] },
  jaeger_sadist: { steps: ["Sanitar 사살"] },
  jaeger_hunter: { steps: ["Shturman 20회 사살"] },
  jaeger_pest_control: { steps: ["Reserve 병영 스캐브 10"] },
  jaeger_swift_one: { steps: ["Woods 갑옷/헬멧 없이 PMC 15"] },
  jaeger_relentless: { steps: ["Reshala/Killa/Shturman/Glukhar/Sanitar/Tagilla 사살", "사망/탈주 금지"] },
  jaeger_the_hermit: { steps: ["Lighthouse 예거 친구 은신처 찾기", "메시지 제출"] },
  jaeger_outcasts: { steps: ["Rogue USEC 10 사살"] },
  jaeger_stray_dogs: { steps: ["Death Knight/Big Pipe/Birdeye 사살"] },
  jaeger_delicious_sausage: { steps: ["Streets 4 상점 정찰", "Salty Dog 소시지 제출"] },
  jaeger_cease_fire: { steps: ["Streets Klimov Street 생존 탈출"] },
  jaeger_slaughterhouse: { steps: ["8개 맵에서 근접으로 스캐브 각 10"] },
  jaeger_broadcast_part_3: { steps: ["Streets 피 묻은 방송 장소 찾기", "생존 탈출"] },
  jaeger_broadcast_part_4: { steps: ["Streets 컬티스트 모임 장소 찾기", "생존 탈출"] },
  jaeger_administrator: { steps: ["Streets 파인우드 호텔 약탈자 20", "호텔 안뜰 노란색 신호탄 발사"] }
});


