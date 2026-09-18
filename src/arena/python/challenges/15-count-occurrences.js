export default {
  title: 'Qiymat necha marta uchrashini sanash',
  difficulty: 'medium',
  prompt: `"count_occurrences" nomli funksiya yozing — u sonlar ro'yxatini (numbers) va bitta qidirilayotgan qiymatni (target) qabul qilib, "target" ro'yxatda necha marta uchraganini qaytaradi.`,
  functionName: 'count_occurrences',
  paramNames: ['numbers', 'target'],
  starterCode: `def count_occurrences(numbers, target):\n    # yechimni yozing\n    pass\n`,
  hint: "Ro'yxatning built-in count() metodidan foydalaning: return numbers.count(target).",
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
