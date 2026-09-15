export default {
  title: 'Unlilarni sanash',
  difficulty: 'medium',
  prompt: `"countVowels" nomli funksiya yozing — u bitta matn (str) qabul qilib, undagi lotin unli harflar (a, e, i, o, u) sonini qaytaradi. Katta va kichik harflarni bir xil hisoblang (masalan, "A" ham unli).`,
  functionName: 'countVowels',
  paramNames: ['str'],
  starterCode: `/**\n * @param {string} str\n * @returns {number}\n */\nfunction countVowels(str) {\n  // yechimni yozing\n\n}\n`,
  examples: [
    { args: ['salom'], expected: 2 },
    { args: ['JavaScript'], expected: 3 },
  ],
  tests: [
    { args: ['salom'], expected: 2 },
    { args: ['JavaScript'], expected: 3 },
    { args: [''], expected: 0 },
    { args: ['AEIOU'], expected: 5 },
    { args: ['xyz'], expected: 0 },
  ],
}
