export default {
  title: 'Faktorial',
  difficulty: 'medium',
  prompt: `"factorial" nomli funksiya yozing — u manfiy bo'lmagan butun son (n) qabul qilib, uning faktorialini (n!) qaytaradi. Faktorial — 1 dan n gacha bo'lgan barcha sonlarning ko'paytmasi. Eslatma: 0! = 1 deb qabul qilinadi.`,
  functionName: 'factorial',
  paramNames: ['n'],
  starterCode: `/**\n * @param {number} n\n * @returns {number}\n */\nfunction factorial(n) {\n  // yechimni yozing\n\n}\n`,
  hint: "1 dan boshlab natijani 2 dan n gacha bo'lgan har bir son bilan ko'paytirib boring.",
  examples: [
    { args: [5], expected: 120 },
    { args: [0], expected: 1 },
  ],
  tests: [
    { args: [5], expected: 120 },
    { args: [0], expected: 1 },
    { args: [1], expected: 1 },
    { args: [4], expected: 24 },
    { args: [6], expected: 720 },
  ],
}
