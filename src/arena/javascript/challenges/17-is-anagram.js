export default {
  title: 'Anagramma tekshirish',
  difficulty: 'hard',
  prompt: `"isAnagram" nomli funksiya yozing — u ikkita matn (a va b) qabul qilib, ular bir-birining anagrammasi bo'lsa "true", aks holda "false" qaytaradi. Anagramma — bir xil harflardan, faqat boshqa tartibda tuzilgan so'z. Katta-kichik harflarni farqlamang, bo'shliqlar haqida qayg'urmang.`,
  functionName: 'isAnagram',
  paramNames: ['a', 'b'],
  starterCode: `/**\n * @param {string} a\n * @param {string} b\n * @returns {boolean}\n */\nfunction isAnagram(a, b) {\n  // yechimni yozing\n\n}\n`,
  hint: "Ikkala matnni kichik harflarga o'tkazib, harflarini alifbo tartibida saralang (sort()) — agar natijalar teng bo'lsa, bu anagramma.",
  examples: [
    { args: ['listen', 'silent'], expected: true },
    { args: ['bola', 'lobo'], expected: false },
  ],
  tests: [
    { args: ['listen', 'silent'], expected: true },
    { args: ['bola', 'lobo'], expected: false },
    { args: ['koala', 'kaola'], expected: true },
    { args: ['apple', 'pabble'], expected: false },
    { args: ['Astronomer', 'Moonstarer'], expected: true },
  ],
}
