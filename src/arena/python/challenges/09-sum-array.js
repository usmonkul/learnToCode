export default {
  title: 'Ro\'yxat elementlari yig\'indisi',
  difficulty: 'easy',
  prompt: `"sum_array" nomli funksiya yozing — u sonlar ro'yxatini (numbers) qabul qilib, barcha elementlar yig'indisini qaytaradi. Bo'sh ro'yxat uchun 0 qaytaring.`,
  functionName: 'sum_array',
  paramNames: ['numbers'],
  starterCode: `def sum_array(numbers):\n    # yechimni yozing\n    pass\n`,
  hint: "Built-in sum() funksiyasidan foydalaning: return sum(numbers).",
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
