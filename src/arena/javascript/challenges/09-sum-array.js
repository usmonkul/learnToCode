export default {
  title: 'Massiv elementlari yig\'indisi',
  difficulty: 'easy',
  prompt: `"sumArray" nomli funksiya yozing — u sonlar massivini (numbers) qabul qilib, barcha elementlar yig'indisini qaytaradi. Bo'sh massiv uchun 0 qaytaring.`,
  functionName: 'sumArray',
  paramNames: ['numbers'],
  starterCode: `/**\n * @param {number[]} numbers\n * @returns {number}\n */\nfunction sumArray(numbers) {\n  // yechimni yozing\n\n}\n`,
  examples: [
    { args: [[1, 2, 3]], expected: 6 },
    { args: [[]], expected: 0 },
  ],
  tests: [
    { args: [[1, 2, 3]], expected: 6 },
    { args: [[]], expected: 0 },
    { args: [[5]], expected: 5 },
    { args: [[-1, -2, 3]], expected: 0 },
    { args: [[10, 20, 30, 40]], expected: 100 },
  ],
}
