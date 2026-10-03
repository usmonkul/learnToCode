import { createContext, useContext, useReducer } from 'react'

// State: { qatorlar: [{ mahsulotId, miqdor }] } — mahsulot obyektlari emas, faqat id va miqdor
const BOSHLANGICH = { qatorlar: [] }

function savatReducer(savat, action) {
  switch (action.type) {
    case 'qoshish': {
      const mavjud = savat.qatorlar.find((q) => q.mahsulotId === action.mahsulotId)
      if (mavjud) {
        return {
          ...savat,
          qatorlar: savat.qatorlar.map((q) =>
            q.mahsulotId === action.mahsulotId ? { ...q, miqdor: q.miqdor + action.miqdor } : q,
          ),
        }
      }
      return {
        ...savat,
        qatorlar: [...savat.qatorlar, { mahsulotId: action.mahsulotId, miqdor: action.miqdor }],
      }
    }
    case 'ozgartirish': {
      if (action.miqdor <= 0) {
        return { ...savat, qatorlar: savat.qatorlar.filter((q) => q.mahsulotId !== action.mahsulotId) }
      }
      return {
        ...savat,
        qatorlar: savat.qatorlar.map((q) =>
          q.mahsulotId === action.mahsulotId ? { ...q, miqdor: action.miqdor } : q,
        ),
      }
    }
    case 'ochirish':
      return { ...savat, qatorlar: savat.qatorlar.filter((q) => q.mahsulotId !== action.mahsulotId) }
    case 'tozalash':
      return BOSHLANGICH
    default:
      throw new Error("Noma'lum action: " + action.type)
  }
}

const SavatContext = createContext(null)
const SavatDispatchContext = createContext(null)

export function SavatProvider({ children }) {
  const [savat, dispatch] = useReducer(savatReducer, BOSHLANGICH)

  return (
    <SavatContext value={savat}>
      <SavatDispatchContext value={dispatch}>{children}</SavatDispatchContext>
    </SavatContext>
  )
}

export function useSavat() {
  const savat = useContext(SavatContext)
  if (savat === null) throw new Error('useSavat faqat SavatProvider ichida ishlatiladi')
  return savat
}

export function useSavatDispatch() {
  const dispatch = useContext(SavatDispatchContext)
  if (dispatch === null) throw new Error('useSavatDispatch faqat SavatProvider ichida ishlatiladi')
  return dispatch
}
