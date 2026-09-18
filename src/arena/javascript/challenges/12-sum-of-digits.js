export default {
  title: "Raqamlar yig'indisi",
  difficulty: 'easy',
  prompt: `"sumDigits" nomli funksiya yozing — u manfiy bo'lmagan butun son (n) qabul qilib, uning har bir raqamining yig'indisini qaytaradi. Masalan, 123 soni uchun 1 + 2 + 3 = 6 qaytishi kerak.`,
  functionName: 'sumDigits',
  paramNames: ['n'],
  starterCode: `/**\n * @param {number} n\n * @returns {number}\n */\nfunction sumDigits(n) {\n  // yechimni yozing\n\n}\n`,
  hint: "while sikli ichida n % 10 bilan oxirgi raqamni oling, so'ng n ni 10 ga bo'lib (Math.floor) qisqartiring.",
  examples: [
    { args: [123], expected: 6 },
    { args: [0], expected: 0 },
  ],
  tests: [
    { args: [123], expected: 6 },
    { args: [0], expected: 0 },
    { args: [9], expected: 9 },
    { args: [4567], expected: 22 },
    { args: [1000], expected: 1 },
  ],
}
