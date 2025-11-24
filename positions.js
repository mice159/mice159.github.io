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

// 좌표 편집 도구에서 내보낸 JSON(0,0 좌표는 제외하고 반영)
Object.assign(window.IMMUTABLE_POSITIONS, {
  "skier_the_extortionist": [
    { map: "customs", x: 49.5, y: 72.6 },
    { map: "customs", x: 60.18, y: 35.42 },
    { map: "customs", x: 36.66, y: 45.42 }
  ],
  "mechanic_introduction": [
    { map: "woods", x: 58.3, y: 58.7 },
    { map: "woods", x: 58.13, y: 56.61 }
  ],
  "prapor_bp_depot": [
    { map: "customs", x: 32.9, y: 53.65 },
    { map: "customs", x: 54.38, y: 51.13 },
    { map: "customs", x: 39.33, y: 27.74 },
    { map: "customs", x: 82.7, y: 29.11 }
  ],
  "prapor_big_customer": [
    { map: "customs", x: 28.85, y: 42.82 }
  ],
  "prapor_reconnaissance": [
    { map: "factory", x: 30.56, y: 33.82 },
    { map: "factory", x: 31.31, y: 65.79 },
    { map: "factory", x: 45.75, y: 56.14 },
    { map: "factory", x: 22.75, y: 30.91 }
  ],
  "prapor_checking": [
    { map: "customs", x: 54.3, y: 51.18 }
  ],
  "prapor_delivery_from_the_past": [
    { map: "customs", x: 75.44, y: 35.22 }
  ],
  "prapor_bad_rep_evidence": [
    { map: "factory", x: 74.81, y: 43.2 },
    { map: "customs", x: 47.71, y: 53.18 }
  ],
  "prapor_shaking_up_teller": [
    { map: "customs", x: 49.88, y: 73.32 }
  ],
  "prapor_anesthesia": [
    { map: "shoreline", x: 49.81, y: 37.66 },
    { map: "shoreline", x: 37.52, y: 50.48 },
    { map: "shoreline", x: 51.49, y: 78.22 }
  ],
  "prapor_documents": [
    { map: "reserve", x: 50.86, y: 38.46 },
    { map: "reserve", x: 51.86, y: 37.39 },
    { map: "reserve", x: 50.17, y: 35.35 }
  ],
  "prapor_bunker_part_1": [
    { map: "reserve", x: 50.68, y: 36.71 }
  ],
  "prapor_bunker_part_2": [
    { map: "reserve", x: 56.38, y: 34.2 },
    { map: "reserve", x: 55.38, y: 23.68 },
    { map: "reserve", x: 51.64, y: 22.74 },
    { map: "reserve", x: 46.19, y: 28.47 },
    { map: "reserve", x: 45.56, y: 38.39 },
    { map: "reserve", x: 48.98, y: 51.75 },
    { map: "reserve", x: 53.41, y: 51.52 }
  ],
  "prapor_glory_to_cpsu": [
    { map: "streets", x: 45.05, y: 60.13 }
  ],
  "prapor_search_mission": [
    { map: "woods", x: 43.1, y: 24.55 },
    { map: "woods", x: 39.12, y: 30.52 }
  ],
  "prapor_easy_job_part_1": [
    { map: "lighthouse", x: 38.15, y: 45.07 }
  ],
  "prapor_youve_got_mail": [
    { map: "streets", x: 48.77, y: 49.78 }
  ],
  "lightkeeper_keepers_word": [
    { map: "labrynth", x: 49.97, y: 32.41 },
    { map: "labrynth", x: 49.6, y: 60.66 },
    { map: "labrynth", x: 39.66, y: 56.11 }
  ],
  "lightkeeper_missing_informant": [
    { map: "streets", x: 52.08, y: 61.64 }
  ],
  "lightkeeper_order_from_outside": [
    { map: "reserve", x: 52.25, y: 39.16 }
  ],
  "lightkeeper_payback": [
    { map: "reserve", x: 54.25, y: 68.11 }
  ],
  "lightkeeper_return_the_favor": [
    { map: "woods", x: 39.36, y: 31.22 },
    { map: "woods", x: 39.46, y: 26.44 }
  ],
  "lightkeeper_simple_side_job": [
    { map: "reserve", x: 58.56, y: 33.01 }
  ],
  "lightkeeper_snatch": [
    { map: "lighthouse", x: 41.56, y: 51.18 }
  ],
  "lightkeeper_spotter": [
    { map: "streets", x: 40.14, y: 76.24 }
  ],
  "lightkeeper_surprise_gift_pvp": [
    { map: "customs", x: 49.3, y: 74.27 }
  ],
  "lightkeeper_trouble_in_the_big_city": [
    { map: "streets", x: 50.52, y: 58.31 }
  ],
  "mechanic_corporate_secrets": [
    { map: "lighthouse", x: 35.73, y: 54.33 },
    { map: "lighthouse", x: 31.99, y: 44.46 }
  ],
  "mechanic_surplus_goods": [
    { map: "reserve", x: 39.68, y: 51.63 }
  ],
  "mechanic_back_door": [
    { map: "reserve_b1", x: 48.69, y: 30.07 },
    { map: "reserve_b1", x: 57, y: 70.07 }
  ],
  "mechanic_the_courier": [
    { map: "customs", x: 50.22, y: 35.96 },
    { map: "customs", x: 33.29, y: 54.67 }
  ],
  "mechanic_signal_part_1": [
    { map: "shoreline", x: 48.58, y: 36.77 },
    { map: "shoreline", x: 57.74, y: 62.17 }
  ],
  "mechanic_signal_part_3": [
    { map: "shoreline", x: 48.73, y: 36.6 },
    { map: "shoreline", x: 57.61, y: 60.48 },
    { map: "shoreline", x: 64.35, y: 50.62 }
  ],
  "mechanic_energy_crisis": [
    { map: "lighthouse", x: 42.86, y: 51.91 },
    { map: "lighthouse", x: 36.38, y: 40.54 },
    { map: "lighthouse", x: 28.08, y: 46.55 },
    { map: "lighthouse", x: 26.11, y: 43.35 }
  ],
  "mechanic_scout": [
    { map: "factory", x: 22.57, y: 30.37 },
    { map: "factory", x: 30.94, y: 34.86 },
    { map: "factory", x: 31.73, y: 66.51 }
  ],
  "mechanic_farming_part_1": [
    { map: "factory", x: 40.85, y: 31.68 },
    { map: "factory", x: 46.01, y: 34.53 }
  ],
  "mechanic_farming_part_3": [
    { map: "customs", x: 74.44, y: 34.21 }
  ],
  "mechanic_chemistry_closet": [
    { map: "shoreline", x: 51.66, y: 37.94 }
  ],
  "mechanic_broadcast_part_1": [
    { map: "lighthouse", x: 35.99, y: 54.22 }
  ],
  "mechanic_broadcast_part_2": [
    { map: "streets", x: 44.65, y: 67.15 }
  ],
  "peacekeeper_revision_lighthouse": [
    { map: "lighthouse", x: 33.4, y: 45.82 },
    { map: "lighthouse", x: 39.51, y: 53.35 },
    { map: "lighthouse", x: 56.73, y: 48.66 },
    { map: "lighthouse", x: 72.89, y: 57 }
  ],
  "peacekeeper_revision_reserve": [
    { map: "reserve", x: 41.29, y: 16.45 },
    { map: "reserve", x: 40.93, y: 38.28 },
    { map: "reserve", x: 39.41, y: 52.2 },
    { map: "reserve", x: 45.32, y: 62.16 },
    { map: "reserve", x: 52.56, y: 18.65 },
    { map: "reserve", x: 54.75, y: 27.42 },
    { map: "reserve", x: 57.7, y: 20.39 }
  ],
  "peacekeeper_revision_streets": [
    { map: "streets", x: 44.15, y: 76.72 },
    { map: "streets", x: 57.06, y: 79.82 },
    { map: "streets", x: 50.57, y: 42.63 }
  ],
  "peacekeeper_scrap_metal": [
    { map: "shoreline", x: 46.05, y: 23.15 },
    { map: "shoreline", x: 52.58, y: 56.47 },
    { map: "shoreline", x: 28.95, y: 54.71 }
  ],
  "peacekeeper_the_cult_part_1": [
    { map: "shoreline", x: 31.75, y: 40.38 },
    { map: "shoreline", x: 32.94, y: 36.07 }
  ],
  "peacekeeper_the_cult_part_2": [
    { map: "customs", x: 49.25, y: 73.84 },
    { map: "woods", x: 39.69, y: 47.97 },
    { map: "woods", x: 42.16, y: 51.09 },
    { map: "woods", x: 52.02, y: 19.94 },
    { map: "shoreline", x: 52.03, y: 37.73 }
  ],
  "peacekeeper_classified_technologies": [
    { map: "reserve_b1", x: 52.27, y: 68.44 }
  ],
  "peacekeeper_fishing_gear": [
    { map: "shoreline", x: 45.52, y: 74.72 }
  ],
  "peacekeeper_your_car_needs_service": [
    { map: "streets", x: 48.31, y: 66.3 }
  ],
  "peacekeeper_road_closed": [
    { map: "streets", x: 50.3, y: 58.69 },
    { map: "streets", x: 46.97, y: 63.03 }
  ],
  "peacekeeper_eagle_eye": [
    { map: "shoreline", x: 38.66, y: 32.16 },
    { map: "shoreline", x: 59.03, y: 34.45 }
  ],
  "peacekeeper_spa_tour_part_2": [
    { map: "shoreline", x: 50.56, y: 39.38 },
    { map: "shoreline", x: 49.53, y: 40.18 }
  ],
  "peacekeeper_spa_tour_part_4": [
    { map: "shoreline", x: 47.15, y: 37.66 },
    { map: "shoreline", x: 46.14, y: 37.48 }
  ],
  "peacekeeper_spa_tour_part_5": [
    { map: "shoreline", x: 46.31, y: 22.58 }
  ],
  "peacekeeper_humanitarian_supplies": [
    { map: "shoreline", x: 60.78, y: 76.96 },
    { map: "shoreline", x: 48.81, y: 31.8 }
  ],
  "peacekeeper_wet_job_part_2": [
    { map: "shoreline", x: 33.54, y: 74.05 }
  ],
  "peacekeeper_wet_job_part_3": [
    { map: "shoreline", x: 40.31, y: 68.95 }
  ],
  "peacekeeper_wet_job_part_4": [
    { map: "shoreline", x: 49.53, y: 33.08 }
  ],
  "peacekeeper_wet_job_part_5": [
    { map: "shoreline", x: 51.57, y: 37.52 }
  ],
  "peacekeeper_terragroup_employee": [
    { map: "lab", x: 49.65, y: 75.23 }
  ],
  "peacekeeper_cargo_x_part_1": [
    { map: "shoreline", x: 51.71, y: 37.45 }
  ],
  "peacekeeper_cargo_x_part_2": [
    { map: "shoreline", x: 52.65, y: 37.55 }
  ],
  "peacekeeper_cargo_x_part_3": [
    { map: "shoreline", x: 48.57, y: 36.48 }
  ],
  "peacekeeper_cargo_x_part_4": [
    { map: "lighthouse", x: 58.28, y: 59.64 }
  ],
  "peacekeeper_tigr_safari": [
    { map: "customs", x: 27.72, y: 50.27 },
    { map: "customs", x: 24.01, y: 47.57 },
    { map: "customs", x: 60.1, y: 51.65 }
  ],
  "ragman_gratitude": [
    { map: "woods", x: 47.71, y: 59.27 }
  ],
  "ragman_database_part_1": [
    { map: "interchange", x: 56.53, y: 80.1 },
    { map: "interchange", x: 61.96, y: 34.34 },
    { map: "interchange", x: 58.02, y: 15.3 }
  ],
  "ragman_big_sale": [
    { map: "interchange", x: 54.38, y: 34.03 },
    { map: "interchange", x: 52.17, y: 39.54 },
    { map: "interchange", x: 59.94, y: 42.02 },
    { map: "interchange", x: 52.34, y: 60.45 },
    { map: "interchange", x: 60.29, y: 64.12 }
  ],
  "ragman_minibus": [
    { map: "interchange", x: 29.6, y: 70.92 },
    { map: "interchange", x: 33.16, y: 48.17 },
    { map: "interchange", x: 36.07, y: 53.21 }
  ],
  "ragman_key_to_success": [
    { map: "interchange", x: 77.6, y: 58.1 },
    { map: "interchange", x: 61.82, y: 34.1 }
  ],
  "ragman_a_fuel_matter": [
    { map: "reserve", x: 48.11, y: 50.78 },
    { map: "reserve", x: 32.77, y: 32.41 }
  ],
  "ragman_inventory_check": [
    { map: "reserve", x: 62.51, y: 36.24 },
    { map: "reserve", x: 60.88, y: 46.47 }
  ],
  "ragman_blood_of_war_part_1": [
    { map: "interchange", x: 42.57, y: 46.86 },
    { map: "interchange", x: 17.4, y: 54.38 },
    { map: "interchange", x: 40.53, y: 17.42 }
  ],
  "ragman_blood_of_war_part_3": [
    { map: "woods", x: 35.58, y: 47.68 },
    { map: "woods", x: 63.09, y: 58.34 },
    { map: "woods", x: 55.35, y: 41.67 }
  ],
  "ragman_hot_delivery": [
    { map: "interchange", x: 26.94, y: 46.48 }
  ],
  "ragman_audiophile": [
    { map: "streets", x: 48.7, y: 53.28 }
  ],
  "ragman_audit": [
    { map: "streets", x: 58.3, y: 59.7 }
  ],
  "ragman_ballet_lover": [
    { map: "streets", x: 48.76, y: 53.31 },
    { map: "streets", x: 48.44, y: 52.11 }
  ],
  "ragman_database_part_2": [
    { map: "interchange", x: 52.74, y: 76.19 }
  ],
  "ragman_harley_forever": [
    { map: "lighthouse", x: 60.21, y: 41.66 },
    { map: "lighthouse", x: 55.55, y: 43.7 }
  ],
  "ref_against_the_conscience_part_1": [
    { map: "customs", x: 49.52, y: 74.28 }
  ],
  "ref_decisions_decisions": [
    { map: "customs", x: 49.38, y: 73.18 }
  ],
  "skier_house_arrest_part_1": [
    { map: "streets", x: 44.95, y: 60.39 }
  ],
  "skier_house_arrest_part_2": [
    { map: "streets", x: 45.77, y: 60.02 }
  ],
  "skier_bullshit": [
    { map: "customs", x: 67.81, y: 52.22 }
  ],
  "skier_chumming": [
    { map: "interchange", x: 60.22, y: 58.71 },
    { map: "customs", x: 49.44, y: 74.11 },
    { map: "woods", x: 48.62, y: 48.7 }
  ],
  "skier_lend_lease_part_1": [
    { map: "woods", x: 40.66, y: 48.64 },
    { map: "woods", x: 46.65, y: 51.03 },
    { map: "shoreline", x: 59.06, y: 52.29 }
  ],
  "skier_vitamins_part_1": [
    { map: "shoreline", x: 46.87, y: 37.43 },
    { map: "interchange", x: 57.01, y: 41.59 },
    { map: "interchange", x: 58, y: 46.76 }
  ],
  "skier_missing_cargo": [
    { map: "lighthouse", x: 65.38, y: 42.08 },
    { map: "lighthouse", x: 59.6, y: 42.62 }
  ],
  "skier_informed_means_armed": [
    { map: "interchange", x: 58.18, y: 53.53 },
    { map: "woods", x: 47.38, y: 56.94 },
    { map: "customs", x: 59.62, y: 65.04 }
  ],
  "skier_top_secret": [
    { map: "lighthouse", x: 73.83, y: 75.08 }
  ],
  "skier_rigged_game": [
    { map: "shoreline", x: 49.75, y: 37.25 },
    { map: "shoreline", x: 38.08, y: 50.8 },
    { map: "shoreline", x: 51.2, y: 78.08 }
  ],
  "skier_debtor": [
    { map: "streets", x: 54.18, y: 44.52 }
  ],
  "skier_chemical_part_1": [
    { map: "customs", x: 28.43, y: 31.84 }
  ],
  "skier_chemical_part_2": [
    { map: "customs", x: 49.41, y: 74.47 }
  ],
  "skier_chemical_part_3": [
    { map: "factory", x: 33.58, y: 45.08 }
  ],
  "skier_chemical_part_4": [
    { map: "customs", x: 29.33, y: 43.81 }
  ],
  "skier_golden_swag": [
    { map: "customs", x: 49.47, y: 74.63 }
  ],
  "therapist_urban_medicine": [
    { map: "streets", x: 46.57, y: 68.72 }
  ],
  "therapist_colleagues_part_1": [
    { map: "shoreline", x: 49.55, y: 39.39 },
    { map: "shoreline", x: 38.09, y: 49.27 },
    { map: "shoreline", x: 51.15, y: 78.89 }
  ],
  "therapist_colleagues_part_2": [
    { map: "shoreline", x: 51.25, y: 78.24 },
    { map: "shoreline", x: 37.91, y: 51.45 }
  ],
  "therapist_drug_trafficking": [
    { map: "lighthouse", x: 28.66, y: 43.33 }
  ],
  "therapist_operation_aquarius_part_1": [
    { map: "customs", x: 49.38, y: 73.84 }
  ],
  "therapist_disease_history": [
    { map: "reserve", x: 52.57, y: 32.63 }
  ],
  "therapist_supply_plans": [
    { map: "woods", x: 48.93, y: 47.84 }
  ],
  "therapist_pharmacist": [
    { map: "customs", x: 49.5, y: 73.58 }
  ],
  "therapist_lost_contact": [
    { map: "lighthouse", x: 59.78, y: 46.14 }
  ],
  "therapist_dangerous_road": [
    { map: "streets", x: 50.31, y: 83.22 }
  ],
  "therapist_health_care_privacy_part_1": [
    { map: "shoreline", x: 50.37, y: 38.18 },
    { map: "shoreline", x: 29.1, y: 64.54 },
    { map: "shoreline", x: 30.91, y: 65.82 }
  ],
  "therapist_health_care_privacy_part_2": [
    { map: "shoreline", x: 47.55, y: 37.51 }
  ],
  "therapist_health_care_privacy_part_3": [
    { map: "woods", x: 52.63, y: 67.42 }
  ],
  "therapist_health_care_privacy_part_5": [
    { map: "factory", x: 74.53, y: 42.64 }
  ],
  "therapist_population_census": [
    { map: "streets", x: 47.25, y: 51.68 }
  ],
  "therapist_seaside_vacation": [
    { map: "lighthouse", x: 51.52, y: 60.8 }
  ],
  "therapist_postman_pat_part_2": [
    { map: "factory", x: 36.17, y: 57.85 }
  ],
  "therapist_out_of_curiosity": [
    { map: "customs", x: 29.53, y: 42.51 }
  ]
});
