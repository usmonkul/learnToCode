export default {
  title: "Massivni bo'laklarga bo'lish",
  difficulty: 'hard',
  prompt: `"chunkArray" nomli funksiya yozing — u sonlar massivini (numbers) va bo'lak uzunligini (size) qabul qilib, massivni shu uzunlikdagi kichik massivlarga bo'lib qaytaradi. Agar oxirgi bo'lak "size" dan kichik bo'lsa, mavjud elementlar bilan qoldirilsin.`,
  functionName: 'chunkArray',
  paramNames: ['numbers', 'size'],
  starterCode: `/**\n * @param {number[]} numbers\n * @param {number} size\n * @returns {number[][]}\n */\nfunction chunkArray(numbers, size) {\n  // yechimni yozing\n\n}\n`,
  hint: "size qadam bilan massiv bo'ylab yuring (for sikli, i += size) va har safar slice(i, i + size) orqali bo'lak ajrating.",
  examples: [
    { args: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
    { args: [[1, 2, 3], 1], expected: [[1], [2], [3]] },
  ],
  tests: [
    { args: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
    { args: [[1, 2, 3, 4], 2], expected: [[1, 2], [3, 4]] },
    { args: [[1, 2, 3], 1], expected: [[1], [2], [3]] },
    { args: [[1, 2, 3, 4, 5, 6], 3], expected: [[1, 2, 3], [4, 5, 6]] },
    { args: [[], 2], expected: [] },
  ],
}
