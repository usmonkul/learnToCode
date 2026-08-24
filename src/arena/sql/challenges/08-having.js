export default {
  title: '3 tadan ortiq mashinasi bor brendlar',
  difficulty: 'medium',
  prompt: `Diler faqat "katta" brendlar — ya'ni katta assortimentga ega brendlar bilan ishlashni xohlaydi. "cars" jadvalidan faqat 3 tadan ortiq mashinasi bo'lgan brendlarni va ularning mashinalar sonini ("soni" deb nomlangan ustunda) chiqaring. Bu yerda GROUP BY'dan keyingi guruhlarni filtrlash kerak bo'ladi — buning uchun WHERE emas, HAVING ishlatiladi.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, COUNT(*) AS soni FROM cars GROUP BY brand HAVING COUNT(*) > 3;',
}
