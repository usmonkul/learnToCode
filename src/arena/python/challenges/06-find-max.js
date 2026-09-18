export default {
  title: "Massivdagi eng katta son",
  difficulty: 'medium',
  prompt: `"find_max" nomli funksiya yozing — u sonlar ro'yxatini (numbers) qabul qilib, ichidagi eng katta qiymatni qaytaradi. Ro'yxat kamida bitta elementdan iborat deb hisoblang, bo'sh ro'yxat haqida qayg'urmang.`,
  functionName: 'find_max',
  paramNames: ['numbers'],
  starterCode: `def find_max(numbers):\n    # yechimni yozing\n    pass\n`,
  hint: "Built-in max() funksiyasi ro'yxatdagi eng katta qiymatni to'g'ridan-to'g'ri qaytaradi: return max(numbers).",
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
