export default {
  title: 'Nasiya hisoblagich',
  description: "Mahsulot narxi, boshlang'ich to'lov va muddatni kiriting — har oy qancha to'lashingizni hisoblab beradi.",
  icon: 'credit-card',
  type: ['JavaScript', 'React'],
  level: 'Beginner',
  guide: {
    colors: [
      { name: 'Violet (asosiy)', hex: '#7c3aed' },
      { name: 'Violet fon', hex: '#f5f3ff' },
      { name: 'Slate matn', hex: '#0f172a' },
    ],
    fonts: ["Figtree (standart, sayt bo'yicha global shrift)"],
    formulas: [
      { name: 'Qolgan summa', formula: "qoldiq = narx − boshlang'ich to'lov" },
      { name: "Oylik to'lov", formula: "oylik = qoldiq / oylar soni" },
    ],
  },
}
