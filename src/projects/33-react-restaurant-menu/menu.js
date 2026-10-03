export const restoran = {
  nomi: 'Beshqozon',
  manzil: "Toshkent, Yunusobod tumani, Amir Temur ko'chasi, 108",
  ishVaqti: '10:00 – 23:00',
}

export const bolimlar = [
  {
    id: 'osh',
    nomi: 'Osh',
    taomlar: [
      {
        id: 'osh-1',
        nomi: "To'y oshi",
        tavsif: "Devzira guruch, qo'y go'shti, sariq sabzi, no'xat va mayiz.",
        narx: 45000,
        belgilar: ['Mashhur'],
        mavjud: true,
      },
      {
        id: 'osh-2',
        nomi: 'Samarqand oshi',
        tavsif: "Qatlam-qatlam tortilgan, go'shti ustiga terilgan osh.",
        narx: 48000,
        chegirma: 10,
        belgilar: [],
        mavjud: true,
      },
      {
        id: 'osh-3',
        nomi: 'Choyxona palovi',
        tavsif: "Bedana tuxumi va qazi bilan. Faqat tushlikkacha.",
        narx: 55000,
        belgilar: ['Yangi'],
        mavjud: false,
      },
    ],
  },
  {
    id: 'shorva',
    nomi: "Sho'rvalar",
    taomlar: [
      {
        id: 'shorva-1',
        nomi: "Qo'y sho'rva",
        tavsif: "Kartoshka, sabzi va ko'katlar bilan tiniq sho'rva.",
        narx: 32000,
        belgilar: [],
        mavjud: true,
      },
      {
        id: 'shorva-2',
        nomi: 'Mastava',
        tavsif: "Guruchli quyuq sho'rva, qatiq bilan tortiladi.",
        narx: 28000,
        belgilar: ['Achchiq'],
        mavjud: true,
      },
    ],
  },
  {
    id: 'salat',
    nomi: 'Salatlar',
    taomlar: [
      {
        id: 'salat-1',
        nomi: 'Achchiq-chuchuk',
        tavsif: 'Pomidor, piyoz va achchiq qalampir.',
        narx: 15000,
        belgilar: ['Vegetarian', 'Achchiq'],
        mavjud: true,
      },
      {
        id: 'salat-2',
        nomi: 'Shakarob',
        tavsif: 'Pomidor va piyoz, rayhon bilan.',
        narx: 14000,
        chegirma: 20,
        belgilar: ['Vegetarian'],
        mavjud: true,
      },
    ],
  },
  {
    id: 'ichimlik',
    nomi: 'Ichimliklar',
    taomlar: [
      {
        id: 'ichimlik-1',
        nomi: "Ko'k choy",
        tavsif: 'Choynakda, limon bilan.',
        narx: 8000,
        belgilar: [],
        mavjud: false,
      },
      {
        id: 'ichimlik-2',
        nomi: 'Kompot',
        tavsif: "Uy kompoti, mavsumiy mevalardan.",
        narx: 12000,
        belgilar: ['Yangi'],
        mavjud: false,
      },
    ],
  },
]
