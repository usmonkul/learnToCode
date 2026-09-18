export default {
  title: 'Unlilarni sanash',
  difficulty: 'medium',
  prompt: `"count_vowels" nomli funksiya yozing — u bitta matn (s) qabul qilib, undagi lotin unli harflar (a, e, i, o, u) sonini qaytaradi. Katta va kichik harflarni bir xil hisoblang (masalan, "A" ham unli).`,
  functionName: 'count_vowels',
  paramNames: ['s'],
  starterCode: `def count_vowels(s):\n    # yechimni yozing\n    pass\n`,
  hint: "Matn bo'ylab har bir harfni tekshiring — uni kichik harfga o'tkazib (lower()), \"aeiou\" qatorida uchrasa hisoblagichni oshiring.",
  examples: [
    { args: ['salom'], expected: 2 },
    { args: ['Python'], expected: 1 },
  ],
  tests: [
    { args: ['salom'], expected: 2 },
    { args: ['Python'], expected: 1 },
    { args: [''], expected: 0 },
    { args: ['AEIOU'], expected: 5 },
    { args: ['xyz'], expected: 0 },
  ],
}
