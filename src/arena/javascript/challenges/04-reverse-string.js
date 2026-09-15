export default {
  title: 'Matnni teskari yozish',
  difficulty: 'easy',
  prompt: `"reverseString" nomli funksiya yozing — u bitta matn (str) qabul qilib, uning harflarini teskari tartibda qaytaradi. Masalan, "salom" so'zi "molas" bo'lib qaytishi kerak.`,
  functionName: 'reverseString',
  paramNames: ['str'],
  starterCode: `/**\n * @param {string} str\n * @returns {string}\n */\nfunction reverseString(str) {\n  // yechimni yozing\n\n}\n`,
  examples: [
    { args: ['salom'], expected: 'molas' },
    { args: ['abc'], expected: 'cba' },
  ],
  tests: [
    { args: ['salom'], expected: 'molas' },
    { args: ['abc'], expected: 'cba' },
    { args: [''], expected: '' },
    { args: ['a'], expected: 'a' },
    { args: ['12345'], expected: '54321' },
  ],
}
