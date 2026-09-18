export default {
  title: 'Palindrom tekshirish',
  difficulty: 'medium',
  prompt: `"is_palindrome" nomli funksiya yozing — u bitta matn (s) qabul qilib, uni oldindan va orqadan o'qiganda bir xil bo'lsa "True", aks holda "False" qaytaradi. Katta-kichik harflarni farqlamang (masalan, "Ana" ham palindrom hisoblansin), bo'sh joy va tinish belgilari haqida qayg'urmang.`,
  functionName: 'is_palindrome',
  paramNames: ['s'],
  starterCode: `def is_palindrome(s):\n    # yechimni yozing\n    pass\n`,
  hint: "Matnni kichik harflarga o'tkazing (lower()), so'ng uni teskarisi (s[::-1]) bilan solishtiring — agar bir xil bo'lsa, bu palindrom.",
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
