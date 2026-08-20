import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url'

let enginePromise = null

export function getSqlEngine() {
  if (!enginePromise) {
    // Import the exact sql-wasm.js file rather than the bare 'sql.js' specifier —
    // the package's "browser" export condition would otherwise resolve to
    // sql-wasm-browser.js, a different file paired with a different .wasm than
    // the one imported above (they happen to be byte-identical today, but
    // nothing guarantees that stays true across sql.js versions).
    enginePromise = import('sql.js/dist/sql-wasm.js').then(({ default: initSqlJs }) =>
      initSqlJs({ locateFile: () => sqlWasmUrl })
    )
  }
  return enginePromise
}
