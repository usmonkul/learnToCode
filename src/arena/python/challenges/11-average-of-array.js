export default {
  title: "O'rtacha qiymat",
  difficulty: 'easy',
  prompt: `"average" nomli funksiya yozing — u sonlar ro'yxatini (numbers) qabul qilib, ularning o'rtacha arifmetik qiymatini qaytaradi. Ro'yxat kamida bitta elementdan iborat deb hisoblang.`,
  functionName: 'average',
  paramNames: ['numbers'],
  starterCode: `def average(numbers):\n    # yechimni yozing\n    pass\n`,
  hint: "sum(numbers) / len(numbers) — yig'indini uzunlikka bo'ling. Python'da / har doim float qaytaradi.",
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
