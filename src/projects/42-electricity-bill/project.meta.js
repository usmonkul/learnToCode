export default {
  title: "Elektr to'lovi hisoblagich",
  description: "Hisoblagichning oldingi va hozirgi ko'rsatkichlarini kiriting — oy davomida qancha kVt·soat ishlatganingiz va to'lov summasini bilib oling.",
  icon: 'zap',
  type: ['JavaScript', 'React'],
  level: 'Beginner',
  guide: {
    colors: [
      { name: 'Yellow (asosiy)', hex: '#facc15' },
      { name: 'Slate (fon)', hex: '#0f172a' },
      { name: 'Slate (karta)', hex: '#1e293b' },
    ],
    fonts: ["Figtree (standart, sayt bo'yicha global shrift)"],
    formulas: [
      { name: 'Ishlatilgan energiya', formula: "kVt·soat = hozirgi − oldingi ko'rsatkich" },
      { name: "To'lov", formula: "summa = kVt·soat × tarif" },
    ],
  },
}
