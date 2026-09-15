const TIMEOUT_MS = 3000

// Runs untrusted student code in a fresh Web Worker so an infinite loop
// (e.g. `while (true) {}`) hangs a terminated worker, never the main tab.
export function runChallenge(code, functionName, tests) {
  return new Promise((resolve) => {
    const worker = new Worker(new URL('../workers/jsChallengeRunner.worker.js', import.meta.url), {
      type: 'module',
    })

    const timeout = setTimeout(() => {
      worker.terminate()
      resolve({ ok: false, error: "Kod bajarilishi juda uzoq davom etdi (cheksiz sikl bo'lishi mumkin)." })
    }, TIMEOUT_MS)

    worker.onmessage = (event) => {
      clearTimeout(timeout)
      worker.terminate()
      resolve(event.data)
    }

    worker.onerror = (event) => {
      clearTimeout(timeout)
      worker.terminate()
      resolve({ ok: false, error: event.message })
    }

    worker.postMessage({ code, functionName, tests })
  })
}
