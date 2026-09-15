import SqlChallengeDetail from '@/components/arena/SqlChallengeDetail'
import JsChallengeDetail from '@/components/arena/JsChallengeDetail'

export default function ChallengeDetail({ challenge, topicId, schema }) {
  if (topicId === 'javascript') return <JsChallengeDetail challenge={challenge} topicId={topicId} />
  return <SqlChallengeDetail challenge={challenge} schema={schema} />
}
