export default {
  title: 'Xodimlar va ularning dilerliklari',
  difficulty: 'medium',
  prompt: `Xodimlar haqidagi ma'lumot ("staff" jadvali) va dilerliklar haqidagi ma'lumot ("dealerships" jadvali) alohida jadvallarda saqlanadi, ular "dealership_id" orqali bog'langan. Ikkala jadvalni birlashtiring (JOIN) va har bir xodimning ismi ("name"), lavozimi ("role") hamda u ishlaydigan dilerlik nomini bitta natijada chiqaring. Dilerlik nomi ustunini "dilerlik" deb nomlang.`,
  starterQuery: '',
  solutionQuery:
    'SELECT s.name, s.role, d.name AS dilerlik FROM staff s JOIN dealerships d ON s.dealership_id = d.id;',
}
