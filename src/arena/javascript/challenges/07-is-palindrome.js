export default {
  title: 'Palindrom tekshirish',
  difficulty: 'medium',
  prompt: `"isPalindrome" nomli funksiya yozing — u bitta matn (str) qabul qilib, uni oldindan va orqadan o'qiganda bir xil bo'lsa "true", aks holda "false" qaytaradi. Katta-kichik harflarni farqlamang (masalan, "Ana" ham palindrom hisoblansin), bo'sh joy va tinish belgilari haqida qayg'urmang.`,
  functionName: 'isPalindrome',
  paramNames: ['str'],
  starterCode: `/**\n * @param {string} str\n * @returns {boolean}\n */\nfunction isPalindrome(str) {\n  // yechimni yozing\n\n}\n`,
  hint: "Matnni kichik harflarga o'tkazing, so'ng uni teskarisiga solishtiring — agar bir xil bo'lsa, bu palindrom.",
  examples: [
    { args: ['ana'], expected: true },
    { args: ['salom'], expected: false },
  ],
  tests: [
    { args: ['ana'], expected: true },
    { args: ['salom'], expected: false },
    { args: ['Ana'], expected: true },
    { args: ['a'], expected: true },
    { args: ['abcba'], expected: true },
    { args: ['abcde'], expected: false },
  ],
}
