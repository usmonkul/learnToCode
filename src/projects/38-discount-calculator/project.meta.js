export default {
  title: 'Chegirma hisoblagich',
  description: "Mahsulot narxi va chegirma foizini kiriting — yangi narxni va qancha tejashingizni bilib oling.",
  icon: 'badge-percent',
  type: ['JavaScript', 'React'],
  level: 'Beginner',
  guide: {
    colors: [
      { name: 'Orange (asosiy)', hex: '#ea580c' },
      { name: 'Orange fon', hex: '#fff7ed' },
      { name: 'Slate matn', hex: '#0f172a' },
    ],
    fonts: ["Figtree (standart, sayt bo'yicha global shrift)"],
    formulas: [
      { name: 'Tejalgan summa', formula: 'tejaldi = narx × foiz / 100' },
      { name: 'Yangi narx', formula: 'yangi narx = narx − tejaldi' },
    ],
  },
}
