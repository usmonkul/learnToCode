export default {
  title: "Takrorlanuvchilarni olib tashlash",
  difficulty: 'medium',
  prompt: `"remove_duplicates" nomli funksiya yozing — u sonlar ro'yxatini (numbers) qabul qilib, takrorlanuvchi qiymatlarsiz yangi ro'yxat qaytaradi. Qolgan elementlarning tartibi dastlabki uchrashish tartibida saqlansin.`,
  functionName: 'remove_duplicates',
  paramNames: ['numbers'],
  starterCode: `def remove_duplicates(numbers):\n    # yechimni yozing\n    pass\n`,
  hint: "dict.fromkeys(numbers) tartibni saqlagan holda takrorlanuvchilarni olib tashlaydi — natijani list() bilan ro'yxatga aylantiring.",
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
