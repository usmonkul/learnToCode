export default {
  title: 'Har bir brenddan nechtadan bor',
  difficulty: 'medium',
  prompt: `Diler qaysi brendlardan ko'proq mashina saqlayotganini bilmoqchi. "cars" jadvalidagi har bir brend ("brand") uchun nechta mashina borligini hisoblang — hisoblangan ustunni "soni" deb nomlang. Natijani mashinalar soni bo'yicha kamayish tartibida chiqaring, shunda eng ko'p mashinasi bor brend birinchi bo'lib ko'rinadi.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, COUNT(*) AS soni FROM cars GROUP BY brand ORDER BY soni DESC;',
}
