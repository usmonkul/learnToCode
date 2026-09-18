export default {
  title: 'Tub son tekshirish',
  difficulty: 'medium',
  prompt: `"isPrime" nomli funksiya yozing — u butun son (n) qabul qilib, agar u tub son bo'lsa "true", aks holda "false" qaytaradi. Tub son — faqat 1 ga va o'ziga bo'linadigan, 1 dan katta son. 0 va 1 tub son emas.`,
  functionName: 'isPrime',
  paramNames: ['n'],
  starterCode: `/**\n * @param {number} n\n * @returns {boolean}\n */\nfunction isPrime(n) {\n  // yechimni yozing\n\n}\n`,
  hint: "2 dan boshlab n ning kvadrat ildiziga qadar bo'luvchilarni tekshiring; birortasi qoldiqsiz bo'linsa, tub son emas.",
  examples: [
    { args: [2], expected: true },
    { args: [4], expected: false },
  ],
  tests: [
    { args: [2], expected: true },
    { args: [3], expected: true },
    { args: [4], expected: false },
    { args: [17], expected: true },
    { args: [1], expected: false },
    { args: [15], expected: false },
  ],
}
