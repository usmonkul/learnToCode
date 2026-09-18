import SqlChallengeDetail from '@/components/arena/SqlChallengeDetail'
import FunctionChallengeDetail from '@/components/arena/FunctionChallengeDetail'

// SQL is the only topic without a functionName/examples/tests shape (it has
// no reference implementation to call, only solutionQuery) — every other
// topic (javascript, python, ...) shares FunctionChallengeDetail's rendering.
export default function ChallengeDetail({ challenge, topicId, schema }) {
  if (topicId === 'sql') return <SqlChallengeDetail challenge={challenge} topicId={topicId} schema={schema} />
  return <FunctionChallengeDetail challenge={challenge} topicId={topicId} />
}
