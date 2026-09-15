export default {
  title: 'Qiymat necha marta uchrashini sanash',
  difficulty: 'medium',
  prompt: `"countOccurrences" nomli funksiya yozing — u sonlar massivini (numbers) va bitta qidirilayotgan qiymatni (target) qabul qilib, "target" massivda necha marta uchraganini qaytaradi.`,
  functionName: 'countOccurrences',
  paramNames: ['numbers', 'target'],
  starterCode: `/**\n * @param {number[]} numbers\n * @param {number} target\n * @returns {number}\n */\nfunction countOccurrences(numbers, target) {\n  // yechimni yozing\n\n}\n`,
  examples: [
    { args: [[1, 2, 2, 3], 2], expected: 2 },
    { args: [[1, 1, 1], 2], expected: 0 },
  ],
  tests: [
    { args: [[1, 2, 2, 3], 2], expected: 2 },
    { args: [[1, 1, 1], 2], expected: 0 },
    { args: [[], 5], expected: 0 },
    { args: [[4, 4, 4, 4], 4], expected: 4 },
    { args: [[1, 2, 3, 4], 5], expected: 0 },
  ],
}
