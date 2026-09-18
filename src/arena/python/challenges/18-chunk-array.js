export default {
  title: "Ro'yxatni bo'laklarga bo'lish",
  difficulty: 'hard',
  prompt: `"chunk_array" nomli funksiya yozing — u sonlar ro'yxatini (numbers) va bo'lak uzunligini (size) qabul qilib, ro'yxatni shu uzunlikdagi kichik ro'yxatlarga bo'lib qaytaradi. Agar oxirgi bo'lak "size" dan kichik bo'lsa, mavjud elementlar bilan qoldirilsin.`,
  functionName: 'chunk_array',
  paramNames: ['numbers', 'size'],
  starterCode: `def chunk_array(numbers, size):\n    # yechimni yozing\n    pass\n`,
  hint: "range(0, len(numbers), size) bo'ylab yuring va har safar numbers[i:i + size] orqali bo'lak ajrating.",
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
