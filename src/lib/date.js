// The student's own local calendar date — never derived server-side, so the
// streak trigger in Postgres never has to guess a timezone.
export function todayLocalDate() {
  return new Date().toLocaleDateString('en-CA')
}
