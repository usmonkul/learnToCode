export default {
  title: "Raqamlar yig'indisi",
  difficulty: 'easy',
  prompt: `"sum_digits" nomli funksiya yozing — u manfiy bo'lmagan butun son (n) qabul qilib, uning har bir raqamining yig'indisini qaytaradi. Masalan, 123 soni uchun 1 + 2 + 3 = 6 qaytishi kerak.`,
  functionName: 'sum_digits',
  paramNames: ['n'],
  starterCode: `def sum_digits(n):\n    # yechimni yozing\n    pass\n`,
  hint: "while sikli ichida n % 10 bilan oxirgi raqamni oling, so'ng n ni 10 ga butun bo'lib (n //= 10) qisqartiring.",
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
