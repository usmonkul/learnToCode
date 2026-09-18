export default {
  title: 'Son juftmi?',
  difficulty: 'easy',
  prompt: `"is_even" nomli funksiya yozing — u bitta butun son (n) qabul qilib, agar u juft son bo'lsa "True", aks holda "False" qaytaradi. "%" (qoldiq qolish) amalidan foydalaning.`,
  functionName: 'is_even',
  paramNames: ['n'],
  starterCode: `def is_even(n):\n    # yechimni yozing\n    pass\n`,
  hint: "n % 2 ifodasi 0 ga teng bo'lsa, son juft. Natijani to'g'ridan-to'g'ri solishtiruv sifatida qaytaring: return n % 2 == 0.",
  examples: [
    { args: [4], expected: true },
    { args: [7], expected: false },
  ],
  tests: [
    { args: [4], expected: true },
    { args: [7], expected: false },
    { args: [0], expected: true },
    { args: [-2], expected: true },
    { args: [-3], expected: false },
  ],
}
