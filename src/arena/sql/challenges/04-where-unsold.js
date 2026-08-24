export default {
  title: 'Hali sotilmagan mashinalar',
  difficulty: 'easy',
  prompt: `"cars" jadvalidagi har bir mashina sotilgan yoki sotilmaganligini "sold" ustuni orqali bilib olish mumkin (0 — sotilmagan, 1 — sotilgan). Hozircha sotilmagan, ya'ni hali dilerlikda turgan barcha mashinalarni chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT * FROM cars WHERE sold = 0;',
}
