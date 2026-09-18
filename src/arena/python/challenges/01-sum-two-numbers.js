export default {
  title: 'Ikki sonni qo\'shish',
  difficulty: 'easy',
  prompt: `"add_two" nomli funksiya yozing — u ikkita son (a va b) qabul qilib, ularning yig'indisini qaytaradi. Bu eng oddiy funksiya mashqi: parametrlarni olib, natijani "return" qilib qaytarish kifoya.`,
  functionName: 'add_two',
  paramNames: ['a', 'b'],
  starterCode: `def add_two(a, b):\n    # yechimni yozing\n    pass\n`,
  hint: "a va b ni to'g'ridan-to'g'ri qo'shib, natijani return qiling — boshqa hech narsa kerak emas.",
  examples: [
    { args: [2, 3], expected: 5 },
    { args: [-1, 1], expected: 0 },
  ],
  tests: [
    { args: [2, 3], expected: 5 },
    { args: [-1, 1], expected: 0 },
    { args: [0, 0], expected: 0 },
    { args: [10, -20], expected: -10 },
    { args: [100, 250], expected: 350 },
  ],
}
