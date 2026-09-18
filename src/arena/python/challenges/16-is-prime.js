export default {
  title: 'Tub son tekshirish',
  difficulty: 'medium',
  prompt: `"is_prime" nomli funksiya yozing — u butun son (n) qabul qilib, agar u tub son bo'lsa "True", aks holda "False" qaytaradi. Tub son — faqat 1 ga va o'ziga bo'linadigan, 1 dan katta son. 0 va 1 tub son emas.`,
  functionName: 'is_prime',
  paramNames: ['n'],
  starterCode: `def is_prime(n):\n    # yechimni yozing\n    pass\n`,
  hint: "2 dan boshlab n ning kvadrat ildiziga qadar bo'luvchilarni tekshiring (range(2, int(n ** 0.5) + 1)); birortasi qoldiqsiz bo'linsa, tub son emas.",
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
