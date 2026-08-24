export default {
  title: 'Sotilgan mashinalar va sotuvchilar',
  difficulty: 'hard',
  prompt: `"sold_cars" jadvali qaysi mashina, kim tomonidan va qanday narxda sotilganini yozib boradi, lekin mashina va xodim haqidagi to'liq ma'lumot boshqa jadvallarda — "cars" va "staff"da saqlanadi. Uchala jadvalni birlashtiring (JOIN) va har bir sotilgan mashinaning brendi ("brand"), modeli ("model"), uni sotgan xodimning ismi ("sotuvchi" deb nomlang) va sotilgan narxini ("sold_price") bitta jadvalda chiqaring.`,
  starterQuery: '',
  solutionQuery:
    'SELECT c.brand, c.model, st.name AS sotuvchi, sc.sold_price FROM sold_cars sc JOIN cars c ON sc.cars_id = c.id JOIN staff st ON sc.seller = st.id;',
}
