export default {
  title: 'Ikki sondan kattasi',
  difficulty: 'easy',
  prompt: `"maxOfTwo" nomli funksiya yozing — u ikkita son (a va b) qabul qilib, ulardan kattasini qaytaradi. Agar ikkalasi teng bo'lsa, o'sha qiymatning o'zini qaytaring.`,
  functionName: 'maxOfTwo',
  paramNames: ['a', 'b'],
  starterCode: `/**\n * @param {number} a\n * @param {number} b\n * @returns {number}\n */\nfunction maxOfTwo(a, b) {\n  // yechimni yozing\n\n}\n`,
  examples: [
    { args: [4, 9], expected: 9 },
    { args: [7, 7], expected: 7 },
  ],
  tests: [
    { args: [4, 9], expected: 9 },
    { args: [7, 7], expected: 7 },
    { args: [-3, -8], expected: -3 },
    { args: [0, 5], expected: 5 },
    { args: [100, 99], expected: 100 },
  ],
}
