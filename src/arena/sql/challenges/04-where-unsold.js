export default {
  title: 'Hali sotilmagan mashinalar',
  difficulty: 'easy',
  prompt: `Hali sotilmagan ("sold" = 0) barcha mashinalarni chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT * FROM cars WHERE sold = 0;',
}
