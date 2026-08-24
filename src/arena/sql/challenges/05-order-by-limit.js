export default {
  title: 'Eng qimmat 5 ta mashina',
  difficulty: 'medium',
  prompt: `Diler eng qimmat mashinalari bilan faxrlanadigan bo'lim ochmoqchi. "cars" jadvalidan eng qimmat 5 ta mashinaning brendi ("brand"), modeli ("model") va narxi ("price") chiqsin — natija narx bo'yicha kamayish tartibida (eng qimmatidan boshlab) tartiblangan bo'lsin.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, model, price FROM cars ORDER BY price DESC LIMIT 5;',
}
