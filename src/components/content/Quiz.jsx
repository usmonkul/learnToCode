import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function Quiz({ question, options, correctIndex, explanation, questions }) {
  if (questions) {
    return <MultiQuiz questions={questions} />
  }

  return <SingleQuiz question={question} options={options} correctIndex={correctIndex} explanation={explanation} />
}

function SingleQuiz({ question, options, correctIndex, explanation, selectedValue, onSelect }) {
  const [internalSelected, setInternalSelected] = useState(null)
  
  const selected = selectedValue !== undefined ? selectedValue : internalSelected
  const answered = selected !== null
  const isCorrect = selected === correctIndex

  const handleSelect = (index) => {
    if (answered) return
    if (onSelect) onSelect(index)
    else setInternalSelected(index)
  }

  return (
    <div className="not-prose my-6 rounded-lg border border-line bg-canvas p-5">
      <p className="mb-3 font-semibold text-ink">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const isSelected = selected === index
          const showCorrect = answered && index === correctIndex
          const showWrong = answered && isSelected && !isCorrect

          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => handleSelect(index)}
              className={cn(
                'flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors',
                'border-line hover:border-brand-300',
                showCorrect && 'border-emerald-400 bg-emerald-50',
                showWrong && 'border-red-400 bg-red-50',
                answered && !showCorrect && !showWrong && 'opacity-60'
              )}
            >
              <span>{option}</span>
              {showCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              {showWrong && <XCircle className="h-4 w-4 text-red-600" />}
            </button>
          )
        })}
      </div>
      {answered && explanation && <p className="mt-3 text-sm text-ink-muted">{explanation}</p>}
    </div>
  )
}

function MultiQuiz({ questions }) {
  const [answers, setAnswers] = useState({})
  
  const total = questions.length
  const answeredCount = Object.keys(answers).length
  const isFinished = answeredCount === total

  let correctCount = 0
  let wrongQuestions = []

  if (isFinished) {
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) {
        correctCount++
      } else {
        wrongQuestions.push(q)
      }
    })
  }

  return (
    <div className="space-y-6">
      {questions.map((q, i) => (
        <SingleQuiz
          key={i}
          {...q}
          selectedValue={answers[i]}
          onSelect={(val) => setAnswers(prev => ({ ...prev, [i]: val }))}
        />
      ))}
      
      {isFinished && (
        <div className="mt-8 p-6 bg-brand-50 border border-brand-200 rounded-lg text-center">
          <h3 className="text-xl font-bold text-brand-700">Natija: {correctCount} / {total}</h3>
          
          {wrongQuestions.length > 0 && (
            <div className="mt-4 text-left text-sm text-red-700">
              <p className="font-semibold mb-2">Xato topilgan savollar:</p>
              <ul className="list-disc pl-5">
                {wrongQuestions.map((wq, i) => (
                  <li key={i} className="mb-1">{wq.question}</li>
                ))}
              </ul>
            </div>
          )}
          
          {correctCount === total && (
            <p className="mt-4 text-emerald-600 font-medium">Barcha savollarga to'g'ri javob berdingiz, barakalla!</p>
          )}
        </div>
      )}
    </div>
  )
}
