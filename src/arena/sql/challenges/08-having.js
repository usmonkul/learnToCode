export default {
  title: '3 tadan ortiq mashinasi bor brendlar',
  difficulty: 'medium',
  prompt: `Faqat 3 tadan ortiq mashinasi bo'lgan brendlarni va ularning mashinalar sonini chiqaring. Soni ustuni "soni" deb nomlansin.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, COUNT(*) AS soni FROM cars GROUP BY brand HAVING COUNT(*) > 3;',
}
