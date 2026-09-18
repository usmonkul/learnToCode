export default {
  title: 'FizzBuzz',
  difficulty: 'hard',
  prompt: `"fizzbuzz" nomli funksiya yozing — u bitta butun son (n) qabul qilib, 1 dan n gacha bo'lgan sonlarni matn ko'rinishida ro'yxat qilib qaytaradi. Agar son 3 ga bo'linsa "Fizz", 5 ga bo'linsa "Buzz", ham 3 ham 5 ga bo'linsa "FizzBuzz" yozilsin; aks holda sonning o'zi matn (str) sifatida qaytsin.`,
  functionName: 'fizzbuzz',
  paramNames: ['n'],
  starterCode: `def fizzbuzz(n):\n    # yechimni yozing\n    pass\n`,
  hint: "range(1, n + 1) bo'ylab aylaning; har bir son uchun avval 15 ga (ham 3 ham 5), keyin 3 ga, keyin 5 ga bo'linishini tekshiring — tartib muhim.",
  examples: [
    { args: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
    { args: [3], expected: ['1', '2', 'Fizz'] },
  ],
  tests: [
    { args: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
    { args: [3], expected: ['1', '2', 'Fizz'] },
    { args: [1], expected: ['1'] },
    { args: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] },
  ],
}
