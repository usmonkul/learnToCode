export default {
  title: "Rang bo'yicha o'rtacha narx",
  difficulty: 'medium',
  prompt: `Har bir rang ("color") uchun o'rtacha narxni hisoblang. Ustun nomi "orta_narx" bo'lsin.`,
  starterQuery: '',
  solutionQuery: 'SELECT color, AVG(price) AS orta_narx FROM cars GROUP BY color;',
}
