export default {
  title: 'Ikki sondan kattasi',
  difficulty: 'easy',
  prompt: `"max_of_two" nomli funksiya yozing — u ikkita son (a va b) qabul qilib, ulardan kattasini qaytaradi. Agar ikkalasi teng bo'lsa, o'sha qiymatning o'zini qaytaring.`,
  functionName: 'max_of_two',
  paramNames: ['a', 'b'],
  starterCode: `def max_of_two(a, b):\n    # yechimni yozing\n    pass\n`,
  hint: "Solishtirish operatoridan (> yoki >=) foydalaning: agar a b dan katta yoki teng bo'lsa, a ni qaytaring, aks holda b ni. Yoki to'g'ridan-to'g'ri built-in max(a, b) dan foydalaning.",
  examples: [
    { args: [4, 9], expected: 9 },
    { args: [7, 7], expected: 7 },
  ],
  tests: [
    { args: [4, 9], expected: 9 },
    { args: [7, 7], expected: 7 },
    { args: [-3, -8], expected: -3 },
    { args: [0, 5], expected: 5 },
    { args: [100, 99], expected: 100 },
  ],
}
