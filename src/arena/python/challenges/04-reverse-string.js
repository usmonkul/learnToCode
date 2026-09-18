export default {
  title: 'Matnni teskari yozish',
  difficulty: 'easy',
  prompt: `"reverse_string" nomli funksiya yozing — u bitta matn (s) qabul qilib, uning harflarini teskari tartibda qaytaradi. Masalan, "salom" so'zi "molas" bo'lib qaytishi kerak.`,
  functionName: 'reverse_string',
  paramNames: ['s'],
  starterCode: `def reverse_string(s):\n    # yechimni yozing\n    pass\n`,
  hint: "Slice sintaksisidan foydalaning: s[::-1] matnni teskari tartibda qaytaradi.",
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
