export default {
  title: 'Anagramma tekshirish',
  difficulty: 'hard',
  prompt: `"is_anagram" nomli funksiya yozing — u ikkita matn (a va b) qabul qilib, ular bir-birining anagrammasi bo'lsa "True", aks holda "False" qaytaradi. Anagramma — bir xil harflardan, faqat boshqa tartibda tuzilgan so'z. Katta-kichik harflarni farqlamang, bo'shliqlar haqida qayg'urmang.`,
  functionName: 'is_anagram',
  paramNames: ['a', 'b'],
  starterCode: `def is_anagram(a, b):\n    # yechimni yozing\n    pass\n`,
  hint: "Ikkala matnni kichik harflarga o'tkazib, sorted() bilan harflarini alifbo tartibida saralang — agar natijalar teng bo'lsa, bu anagramma.",
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
