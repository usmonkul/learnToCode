export default {
  title: "Foydalanuvchilar ro'yxati",
  description:
    "API'dan foydalanuvchilarni yuklab, kartochkalarda ko'rsating. Yuklanish, xato va muvaffaqiyat — fetch'ning uchta holatini to'g'ri ko'rsatishni o'rganing.",
  icon: 'users-round',
  type: ['JavaScript', 'React'],
  level: 'Beginner',
  guide: {
    colors: [
      { name: 'Blue (asosiy)', hex: '#2563eb' },
      { name: 'Slate fon', hex: '#f8fafc' },
      { name: 'Xato', hex: '#dc2626' },
    ],
    fonts: ["Figtree (standart, sayt bo'yicha global shrift)"],
    api: { name: 'JSONPlaceholder /users', url: 'https://jsonplaceholder.typicode.com/users' },
    topics: ['fetch() va async/await', 'response.ok tekshiruvi', 'try / catch / finally', 'Yuklanish, xato va natija holatlari', 'useEffect ichida fetch'],
  },
}
