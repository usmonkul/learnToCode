export default {
  title: 'Faqat kerakli ustunlar',
  difficulty: 'easy',
  prompt: `Har doim ham jadvalning barcha ustunlari kerak bo'lavermaydi. "cars" jadvalidan faqat mashinaning brendi ("brand"), modeli ("model") va ishlab chiqarilgan yili ("year") ko'rsatilgan bo'lsin — boshqa ustunlar (narx, rang va h.k.) natijada bo'lmasin.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, model, year FROM cars;',
}
