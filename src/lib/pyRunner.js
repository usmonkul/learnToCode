const TIMEOUT_MS = 15000 // Pyodide's first load (CDN fetch + wasm init) is far slower than a JS Function() eval.

// Unlike jsRunner.js's fresh-worker-per-run, this worker is reused across
// calls — Pyodide's own load cost (see pyChallengeRunner.worker.js) is too
// high to repeat on every "Yuritish"/"Yuborish" click. Mirrors sqlEngine.js's
// memoized-heavy-engine pattern, just worker-hosted instead of main-thread,
// since untrusted student code still needs to be terminable on an infinite loop.
let worker = null
let nextId = 0
const pending = new Map()

function ensureWorker() {
  if (worker) return worker

  worker = new Worker(new URL('../workers/pyChallengeRunner.worker.js', import.meta.url))

  worker.onmessage = (event) => {
    const { id, ...payload } = event.data
    const resolve = pending.get(id)
    if (!resolve) return
    pending.delete(id)
    resolve(payload)
  }

  worker.onerror = (event) => {
    for (const resolve of pending.values()) resolve({ ok: false, error: event.message })
    pending.clear()
    worker?.terminate()
    worker = null
  }

  return worker
}

export function runChallenge(code, functionName, tests) {
  const activeWorker = ensureWorker()
  const id = nextId++

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      pending.delete(id)
      // Terminate rather than trust the worker to recover — an infinite loop
      // in Python bytecode never yields back to the event loop on its own.
      worker?.terminate()
      worker = null
      resolve({ ok: false, error: "Kod bajarilishi juda uzoq davom etdi (cheksiz sikl bo'lishi mumkin)." })
    }, TIMEOUT_MS)

    pending.set(id, (payload) => {
      clearTimeout(timeout)
      resolve(payload)
    })

    activeWorker.postMessage({ id, code, functionName, tests })
  })
}
