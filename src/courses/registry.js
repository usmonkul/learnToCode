const courseMetaModules = import.meta.glob('./*/course.meta.js', { eager: true })
const lessonModules = import.meta.glob('./*/lessons/*.jsx', { eager: true })

// Lesson filenames must use a zero-padded two-digit prefix ("01-...", "02-...")
// so plain string sorting keeps them in the right order.
function courseIdFromPath(path) {
  return path.match(/^\.\/([^/]+)\//)[1]
}

function slugFromLessonPath(path) {
  return path
    .split('/')
    .pop()
    .replace(/\.jsx$/, '')
    .replace(/^\d+-/, '')
}

const courses = new Map()
for (const [path, mod] of Object.entries(courseMetaModules)) {
  const id = courseIdFromPath(path)
  courses.set(id, { ...mod.default, id })
}

const lessonsByCourse = new Map()
for (const [path, mod] of Object.entries(lessonModules)) {
  const courseId = courseIdFromPath(path)
  const slug = slugFromLessonPath(path)
  if (!mod.meta) {
    console.warn(`Lesson module "${path}" is missing "export const meta" — using a fallback title.`)
  }
  const entry = {
    slug,
    path,
    meta: mod.meta ?? { title: slug, section: '' },
    Component: mod.default,
  }
  if (!lessonsByCourse.has(courseId)) lessonsByCourse.set(courseId, [])
  lessonsByCourse.get(courseId).push(entry)
}
for (const lessons of lessonsByCourse.values()) {
  lessons.sort((a, b) => a.path.localeCompare(b.path))
}

export function getAllCourses() {
  return Array.from(courses.values())
}

export function getCourse(courseId) {
  return courses.get(courseId)
}

export function getLessons(courseId) {
  return lessonsByCourse.get(courseId) ?? []
}

export function getLesson(courseId, slug) {
  return getLessons(courseId).find((lesson) => lesson.slug === slug)
}

export function getAdjacentLessons(courseId, slug) {
  const lessons = getLessons(courseId)
  const index = lessons.findIndex((lesson) => lesson.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  }
}

export function getGroupedLessons(courseId) {
  const lessons = getLessons(courseId)
  const groups = []
  for (const lesson of lessons) {
    const section = lesson.meta?.section ?? ''
    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup.section === section) {
      lastGroup.lessons.push(lesson)
    } else {
      groups.push({ section, lessons: [lesson] })
    }
  }
  return groups
}
