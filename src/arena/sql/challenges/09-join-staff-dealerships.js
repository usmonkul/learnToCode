export default {
  title: 'Xodimlar va ularning dilerliklari',
  difficulty: 'medium',
  prompt: `"staff" jadvalini "dealerships" jadvali bilan birlashtiring (JOIN) va har bir xodimning ismi ("name"), lavozimi ("role") va dilerlik nomini chiqaring. Dilerlik nomi ustunini "dilerlik" deb nomlang.`,
  starterQuery: '',
  solutionQuery:
    'SELECT s.name, s.role, d.name AS dilerlik FROM staff s JOIN dealerships d ON s.dealership_id = d.id;',
}
