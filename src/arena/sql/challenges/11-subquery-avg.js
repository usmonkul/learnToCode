export default {
  title: "O'rtacha narxdan qimmat mashinalar",
  difficulty: 'hard',
  prompt: `"O'rtachadan qimmat" mashinalarni topish uchun avval o'rtacha narxni bilish kerak — lekin buni alohida so'rov sifatida emas, boshqa so'rov ichida yozish mumkin. Narxi barcha mashinalarning o'rtacha narxidan qimmat bo'lgan mashinalarning brendi ("brand"), modeli ("model") va narxini ("price") chiqaring. O'rtacha narxni WHERE shartining ichida, ichki so'rov (subquery) sifatida hisoblang.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, model, price FROM cars WHERE price > (SELECT AVG(price) FROM cars);',
}
