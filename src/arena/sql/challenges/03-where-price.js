export default {
  title: 'Qimmat mashinalar',
  difficulty: 'easy',
  prompt: `Diler faqat qimmat mashinalarni ko'rsatadigan ro'yxat tayyorlamoqchi. "cars" jadvalidan narxi ("price") 50000 dan qimmat bo'lgan barcha mashinalarni, barcha ustunlari bilan, chiqaring. WHERE shartidan foydalaning.`,
  starterQuery: '',
  solutionQuery: 'SELECT * FROM cars WHERE price > 50000;',
}
