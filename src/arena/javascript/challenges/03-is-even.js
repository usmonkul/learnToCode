export default {
  title: 'Son juftmi?',
  difficulty: 'easy',
  prompt: `"isEven" nomli funksiya yozing — u bitta butun son (n) qabul qilib, agar u juft son bo'lsa "true", aks holda "false" qaytaradi. "%" (qoldiq qolish) amalidan foydalaning.`,
  functionName: 'isEven',
  paramNames: ['n'],
  starterCode: `/**\n * @param {number} n\n * @returns {boolean}\n */\nfunction isEven(n) {\n  // yechimni yozing\n\n}\n`,
  hint: "n % 2 ifodasi 0 ga teng bo'lsa, son juft. Natijani to'g'ridan-to'g'ri solishtiruv sifatida qaytaring.",
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
