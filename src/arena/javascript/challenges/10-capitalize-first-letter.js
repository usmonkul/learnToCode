export default {
  title: 'Birinchi harfni katta qilish',
  difficulty: 'easy',
  prompt: `"capitalize" nomli funksiya yozing — u bitta matn (str) qabul qilib, uning birinchi harfini katta harfga aylantirib qaytaradi. Matnning qolgan qismi o'zgarmasin. Bo'sh matn uchun bo'sh matn qaytaring.`,
  functionName: 'capitalize',
  paramNames: ['str'],
  starterCode: `/**\n * @param {string} str\n * @returns {string}\n */\nfunction capitalize(str) {\n  // yechimni yozing\n\n}\n`,
  hint: "Birinchi harfni toUpperCase() bilan katta qiling, qolgan qismini slice(1) bilan olib, ikkalasini birlashtiring.",
  examples: [
    { args: ['salom'], expected: 'Salom' },
    { args: ['book'], expected: 'Book' },
  ],
  tests: [
    { args: ['salom'], expected: 'Salom' },
    { args: ['book'], expected: 'Book' },
    { args: [''], expected: '' },
    { args: ['A'], expected: 'A' },
    { args: ['python'], expected: 'Python' },
  ],
}
