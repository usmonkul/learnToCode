export default {
  title: "Eng ko'p sotgan xodim",
  difficulty: 'hard',
  prompt: `"sold_cars" va "staff" jadvallarini birlashtirib, eng ko'p mashina sotgan xodimning ismi va sotgan mashinalar sonini chiqaring (faqat 1 ta qator). Soni ustuni "sotilgan_soni" deb nomlansin.`,
  starterQuery: '',
  solutionQuery:
    'SELECT st.name, COUNT(*) AS sotilgan_soni FROM sold_cars sc JOIN staff st ON sc.seller = st.id GROUP BY st.name ORDER BY sotilgan_soni DESC LIMIT 1;',
}
