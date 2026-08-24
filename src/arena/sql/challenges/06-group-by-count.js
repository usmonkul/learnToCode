export default {
  title: 'Har bir brenddan nechtadan bor',
  difficulty: 'medium',
  prompt: `Har bir brend ("brand") uchun nechta mashina borligini hisoblang. Ustun nomi "soni" bo'lsin, natijani mashinalar soni bo'yicha kamayish tartibida chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, COUNT(*) AS soni FROM cars GROUP BY brand ORDER BY soni DESC;',
}
