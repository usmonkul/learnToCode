// Classic (non-module) worker on purpose — importScripts() to pull in
// Pyodide's UMD loader isn't available inside a module worker. Loaded from
// jsDelivr's CDN rather than self-hosted like sql.js's wasm, since Pyodide's
// full runtime + stdlib is tens of MB; the browser caches it after first use.
const PYODIDE_INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/v0.28.1/full/'

// Kept alive across messages (unlike jsChallengeRunner.worker.js, which is
// disposable per run) — reloading Pyodide from the CDN on every "Yuritish"/
// "Yuborish" click would be far too slow. pyRunner.js reuses this same worker
// instance for as long as it stays alive; only a timeout-triggered terminate
// (an infinite loop) forces a fresh worker, and therefore a fresh load, on
// the next call.
let pyodideReadyPromise = null

function loadPyodideOnce() {
  if (!pyodideReadyPromise) {
    self.importScripts(`${PYODIDE_INDEX_URL}pyodide.js`)
    pyodideReadyPromise = self.loadPyodide({ indexURL: PYODIDE_INDEX_URL })
  }
  return pyodideReadyPromise
}

// Pyodide's PythonError.message is a full traceback — the last line is the
// actual exception, which is what a student needs to see.
function lastTracebackLine(error) {
  const message = error?.message ?? String(error)
  const lines = message.trim().split('\n')
  return lines[lines.length - 1]
}

// Primitives (int/float/str/bool/None) already cross the Python->JS call
// boundary as plain JS values; only containers (list/dict/tuple/set) come
// back as a PyProxy needing an explicit, recursive toJs().
function toPlainJs(value) {
  if (value && typeof value === 'object' && typeof value.toJs === 'function') {
    const converted = value.toJs({ dict_converter: Object.fromEntries })
    value.destroy?.()
    return converted
  }
  return value
}

self.onmessage = async (event) => {
  const { id, code, functionName, tests } = event.data

  let pyodide
  try {
    pyodide = await loadPyodideOnce()
  } catch (error) {
    self.postMessage({ id, ok: false, error: `Python vositasini yuklab bo'lmadi: ${error.message}` })
    return
  }

  // A fresh namespace per run keeps one challenge's globals from leaking
  // into the next run's execution.
  const namespace = pyodide.globals.get('dict')()
  let fn
  try {
    pyodide.runPython(code, { globals: namespace })
    fn = namespace.get(functionName)
    if (typeof fn !== 'function') throw new Error(`"${functionName}" funksiyasi topilmadi.`)
  } catch (error) {
    namespace.destroy()
    self.postMessage({ id, ok: false, error: lastTracebackLine(error) })
    return
  }

  const results = tests.map((test) => {
    try {
      const actual = toPlainJs(fn(...test.args))
      return { pass: JSON.stringify(actual) === JSON.stringify(test.expected), actual }
    } catch (error) {
      return { pass: false, error: lastTracebackLine(error) }
    }
  })

  fn.destroy?.()
  namespace.destroy()
  self.postMessage({ id, ok: true, results })
}
