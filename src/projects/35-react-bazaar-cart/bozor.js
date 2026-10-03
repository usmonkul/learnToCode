export const KATEGORIYALAR = [
  { id: 'hammasi', nomi: 'Hammasi' },
  { id: 'sabzavot', nomi: 'Sabzavotlar' },
  { id: 'meva', nomi: 'Mevalar' },
  { id: 'non', nomi: 'Non' },
  { id: 'sut', nomi: 'Sut mahsulotlari' },
]

// birlik: 'kg' — 0.5 kg qadam bilan, 'dona' — 1 dona qadam bilan
export const MAHSULOTLAR = [
  { id: 'pomidor', nomi: 'Pomidor', kategoriya: 'sabzavot', narx: 14000, birlik: 'kg', belgi: '🍅' },
  { id: 'bodring', nomi: 'Bodring', kategoriya: 'sabzavot', narx: 9000, birlik: 'kg', belgi: '🥒' },
  { id: 'kartoshka', nomi: 'Kartoshka', kategoriya: 'sabzavot', narx: 6000, birlik: 'kg', belgi: '🥔' },
  { id: 'sabzi', nomi: 'Sariq sabzi', kategoriya: 'sabzavot', narx: 7000, birlik: 'kg', belgi: '🥕' },
  { id: 'olma', nomi: 'Olma', kategoriya: 'meva', narx: 16000, birlik: 'kg', belgi: '🍎' },
  { id: 'uzum', nomi: 'Uzum', kategoriya: 'meva', narx: 22000, birlik: 'kg', belgi: '🍇' },
  { id: 'anor', nomi: 'Anor', kategoriya: 'meva', narx: 25000, birlik: 'kg', belgi: '🔴' },
  { id: 'non', nomi: 'Tandir non', kategoriya: 'non', narx: 4000, birlik: 'dona', belgi: '🫓' },
  { id: 'patir', nomi: 'Patir', kategoriya: 'non', narx: 9000, birlik: 'dona', belgi: '🥯' },
  { id: 'qatiq', nomi: 'Qatiq', kategoriya: 'sut', narx: 11000, birlik: 'dona', belgi: '🥛' },
  { id: 'suzma', nomi: 'Suzma', kategoriya: 'sut', narx: 18000, birlik: 'dona', belgi: '🧀' },
]

export const YETKAZISH_NARXI = 15000
export const BEPUL_YETKAZISH_CHEGARASI = 100000

export function qadam(birlik) {
  return birlik === 'kg' ? 0.5 : 1
}

export function somda(son) {
  return Math.round(son).toLocaleString('uz-UZ') + " so'm"
}

// Savat qatorlaridan barcha hisob-kitob — state emas, har renderda hisoblanadi
export function hisobla(qatorlar) {
  const batafsil = qatorlar.map((q) => {
    const mahsulot = MAHSULOTLAR.find((m) => m.id === q.mahsulotId)
    return { ...q, mahsulot, summa: mahsulot.narx * q.miqdor }
  })
  const oraliq = batafsil.reduce((jami, q) => jami + q.summa, 0)
  const yetkazish = oraliq === 0 || oraliq >= BEPUL_YETKAZISH_CHEGARASI ? 0 : YETKAZISH_NARXI
  return { batafsil, oraliq, yetkazish, jami: oraliq + yetkazish }
}
