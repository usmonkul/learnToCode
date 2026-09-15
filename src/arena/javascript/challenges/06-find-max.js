export default {
  title: "Massivdagi eng katta son",
  difficulty: 'medium',
  prompt: `"findMax" nomli funksiya yozing — u sonlar massivini (numbers) qabul qilib, ichidagi eng katta qiymatni qaytaradi. Massiv kamida bitta elementdan iborat deb hisoblang, bo'sh massiv haqida qayg'urmang.`,
  functionName: 'findMax',
  paramNames: ['numbers'],
  starterCode: `/**\n * @param {number[]} numbers\n * @returns {number}\n */\nfunction findMax(numbers) {\n  // yechimni yozing\n\n}\n`,
  examples: [
    { args: [[1, 5, 3]], expected: 5 },
    { args: [[-4, -1, -9]], expected: -1 },
  ],
  tests: [
    { args: [[1, 5, 3]], expected: 5 },
    { args: [[-4, -1, -9]], expected: -1 },
    { args: [[7]], expected: 7 },
    { args: [[2, 2, 2]], expected: 2 },
    { args: [[10, 200, 30, 4]], expected: 200 },
  ],
}
