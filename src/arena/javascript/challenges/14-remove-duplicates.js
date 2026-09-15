export default {
  title: "Takrorlanuvchilarni olib tashlash",
  difficulty: 'medium',
  prompt: `"removeDuplicates" nomli funksiya yozing — u sonlar massivini (numbers) qabul qilib, takrorlanuvchi qiymatlarsiz yangi massiv qaytaradi. Qolgan elementlarning tartibi dastlabki uchrashish tartibida saqlansin.`,
  functionName: 'removeDuplicates',
  paramNames: ['numbers'],
  starterCode: `/**\n * @param {number[]} numbers\n * @returns {number[]}\n */\nfunction removeDuplicates(numbers) {\n  // yechimni yozing\n\n}\n`,
  examples: [
    { args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
    { args: [[1, 1, 1]], expected: [1] },
  ],
  tests: [
    { args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
    { args: [[1, 1, 1]], expected: [1] },
    { args: [[]], expected: [] },
    { args: [[5, 4, 3, 2, 1]], expected: [5, 4, 3, 2, 1] },
    { args: [[1, 2, 1, 2, 1]], expected: [1, 2] },
  ],
}
