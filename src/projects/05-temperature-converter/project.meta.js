export default {
  title: 'Harorat konvertori',
  description: "Haroratni Selsiydan Farengeytga yoki Farengeytdan Selsiyga o'giring.",
  icon: 'thermometer',
  type: 'JavaScript',
  level: 'Beginner',
  guide: {
    colors: [
      { name: 'Rose', hex: '#f43f5e' },
      { name: 'Sky', hex: '#0ea5e9' },
    ],
    fonts: ["Figtree (standart, sayt bo'yicha global shrift)"],
    formulas: [
      { name: 'Selsiy → Farengeyt', formula: '°F = °C × 9 / 5 + 32' },
      { name: 'Farengeyt → Selsiy', formula: '°C = (°F − 32) × 5 / 9' },
    ],
  },
}
