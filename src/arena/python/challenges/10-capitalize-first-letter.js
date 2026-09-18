export default {
  title: 'Birinchi harfni katta qilish',
  difficulty: 'easy',
  prompt: `"capitalize_first" nomli funksiya yozing — u bitta matn (s) qabul qilib, uning birinchi harfini katta harfga aylantirib qaytaradi. Matnning qolgan qismi o'zgarmasin. Bo'sh matn uchun bo'sh matn qaytaring.`,
  functionName: 'capitalize_first',
  paramNames: ['s'],
  starterCode: `def capitalize_first(s):\n    # yechimni yozing\n    pass\n`,
  hint: "Birinchi harfni s[0].upper() bilan katta qiling, qolgan qismini s[1:] bilan olib, ikkalasini birlashtiring.",
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
