export default {
  title: 'FizzBuzz',
  difficulty: 'hard',
  prompt: `"fizzBuzz" nomli funksiya yozing — u bitta butun son (n) qabul qilib, 1 dan n gacha bo'lgan sonlarni matn ko'rinishida massiv qilib qaytaradi. Agar son 3 ga bo'linsa "Fizz", 5 ga bo'linsa "Buzz", ham 3 ham 5 ga bo'linsa "FizzBuzz" yozilsin; aks holda sonning o'zi matn (string) sifatida qaytsin.`,
  functionName: 'fizzBuzz',
  paramNames: ['n'],
  starterCode: `/**\n * @param {number} n\n * @returns {string[]}\n */\nfunction fizzBuzz(n) {\n  // yechimni yozing\n\n}\n`,
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
