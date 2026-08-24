const topicMetaModules = import.meta.glob('./*/topic.meta.js', { eager: true })
const challengeModules = import.meta.glob('./*/challenges/*.js', { eager: true })

// Challenge filenames must use a zero-padded two-digit prefix ("01-...", "02-...")
// so plain string sorting keeps them in the right order — same convention as
// src/courses/registry.js.
function topicIdFromPath(path) {
  return path.match(/^\.\/([^/]+)\//)[1]
}

function slugFromChallengePath(path) {
  return path
    .split('/')
    .pop()
    .replace(/\.js$/, '')
    .replace(/^\d+-/, '')
}

const topics = new Map()
for (const [path, mod] of Object.entries(topicMetaModules)) {
  const id = topicIdFromPath(path)
  topics.set(id, { ...mod.default, id })
}

const challengesByTopic = new Map()
for (const [path, mod] of Object.entries(challengeModules)) {
  const topicId = topicIdFromPath(path)
  const slug = slugFromChallengePath(path)
  if (!mod.default) {
    console.warn(`Challenge module "${path}" is missing a default export — skipping.`)
    continue
  }
  const entry = { slug, path, ...mod.default }
  if (!challengesByTopic.has(topicId)) challengesByTopic.set(topicId, [])
  challengesByTopic.get(topicId).push(entry)
}
for (const challenges of challengesByTopic.values()) {
  challenges.sort((a, b) => a.path.localeCompare(b.path))
}

export function getTopics() {
  return Array.from(topics.values())
}

export function getTopic(topicId) {
  return topics.get(topicId)
}

export function getChallenges(topicId) {
  return challengesByTopic.get(topicId) ?? []
}

export function getChallenge(topicId, slug) {
  return getChallenges(topicId).find((challenge) => challenge.slug === slug)
}
