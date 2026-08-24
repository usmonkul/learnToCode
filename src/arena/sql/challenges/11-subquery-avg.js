export default {
  title: "O'rtacha narxdan qimmat mashinalar",
  difficulty: 'hard',
  prompt: `Narxi barcha mashinalarning o'rtacha narxidan qimmat bo'lgan mashinalarning "brand", "model" va "price" ustunlarini chiqaring. O'rtacha narxni ichki so'rov (subquery) yordamida hisoblang.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, model, price FROM cars WHERE price > (SELECT AVG(price) FROM cars);',
}
