export default {
  title: "Rang bo'yicha o'rtacha narx",
  difficulty: 'medium',
  prompt: `Ba'zi ranglar boshqalariga qaraganda qimmatroq mashinalarga xos bo'lishi mumkin. "cars" jadvalidagi har bir rang ("color") uchun o'rtacha narxni hisoblang — natijadagi ustun nomi "orta_narx" bo'lsin. AVG() funksiyasi va GROUP BY'dan foydalaning.`,
  starterQuery: '',
  solutionQuery: 'SELECT color, AVG(price) AS orta_narx FROM cars GROUP BY color;',
}
