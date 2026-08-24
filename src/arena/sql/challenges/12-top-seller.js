export default {
  title: "Eng ko'p sotgan xodim",
  difficulty: 'hard',
  prompt: `Dilerlik oyning eng yaxshi sotuvchisini mukofotlamoqchi. "sold_cars" va "staff" jadvallarini birlashtiring va har bir xodim nechta mashina sotganini hisoblang, so'ngra eng ko'p sotgan bitta xodimning ismini va sotgan mashinalar sonini chiqaring (natijada faqat 1 ta qator bo'lsin). Sonlar ustuni "sotilgan_soni" deb nomlansin.`,
  starterQuery: '',
  solutionQuery:
    'SELECT st.name, COUNT(*) AS sotilgan_soni FROM sold_cars sc JOIN staff st ON sc.seller = st.id GROUP BY st.name ORDER BY sotilgan_soni DESC LIMIT 1;',
}
