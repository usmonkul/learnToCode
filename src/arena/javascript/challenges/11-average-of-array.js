export default {
  title: "O'rtacha qiymat",
  difficulty: 'easy',
  prompt: `"average" nomli funksiya yozing — u sonlar massivini (numbers) qabul qilib, ularning o'rtacha arifmetik qiymatini qaytaradi. Massiv kamida bitta elementdan iborat deb hisoblang.`,
  functionName: 'average',
  paramNames: ['numbers'],
  starterCode: `/**\n * @param {number[]} numbers\n * @returns {number}\n */\nfunction average(numbers) {\n  // yechimni yozing\n\n}\n`,
  hint: "Avval barcha elementlar yig'indisini toping (reduce), so'ng uni massiv uzunligiga (length) bo'ling.",
  examples: [
    { args: [[1, 2, 3]], expected: 2 },
    { args: [[2, 4, 6, 8]], expected: 5 },
  ],
  tests: [
    { args: [[1, 2, 3]], expected: 2 },
    { args: [[2, 4, 6, 8]], expected: 5 },
    { args: [[5]], expected: 5 },
    { args: [[0, 0, 0]], expected: 0 },
    { args: [[1, 2, 3, 4]], expected: 2.5 },
  ],
}
