export default {
  title: 'Eng qimmat 5 ta mashina',
  difficulty: 'medium',
  prompt: `Eng qimmat 5 ta mashinaning "brand", "model" va "price" ustunlarini narx bo'yicha kamayish tartibida chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, model, price FROM cars ORDER BY price DESC LIMIT 5;',
}
