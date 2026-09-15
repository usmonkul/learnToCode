self.onmessage = (event) => {
  const { code, functionName, tests } = event.data

  let fn
  try {
    // eslint-disable-next-line no-new-func
    fn = new Function(`${code}\nreturn ${functionName};`)()
    if (typeof fn !== 'function') throw new Error(`"${functionName}" funksiyasi topilmadi.`)
  } catch (error) {
    self.postMessage({ ok: false, error: error.message })
    return
  }

  const results = tests.map((test) => {
    try {
      const actual = fn(...test.args)
      return { pass: JSON.stringify(actual) === JSON.stringify(test.expected), actual }
    } catch (error) {
      return { pass: false, error: error.message }
    }
  })

  self.postMessage({ ok: true, results })
}
