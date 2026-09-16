const projectMetaModules = import.meta.glob('./*/project.meta.js', { eager: true })
const projectComponentModules = import.meta.glob('./*/Project.jsx', { eager: true })

// Project folder names must use a zero-padded two-digit prefix ("01-...", "02-...")
// so plain string sorting keeps them in the right order — same convention as
// src/courses/registry.js and src/arena/registry.js.
function folderFromPath(path) {
  return path.match(/^\.\/([^/]+)\//)[1]
}

function slugFromFolder(folder) {
  return folder.replace(/^\d+-/, '')
}

const projects = new Map()
for (const [path, mod] of Object.entries(projectMetaModules)) {
  const folder = folderFromPath(path)
  projects.set(folder, { ...mod.default, id: slugFromFolder(folder), path })
}

for (const [path, mod] of Object.entries(projectComponentModules)) {
  const folder = folderFromPath(path)
  const entry = projects.get(folder)
  if (!entry) {
    console.warn(`Project component "${path}" has no matching "project.meta.js" — skipping.`)
    continue
  }
  entry.Component = mod.default
}

const orderedProjects = Array.from(projects.values()).sort((a, b) => a.path.localeCompare(b.path))

export function getAllProjects() {
  return orderedProjects
}

export function getProject(id) {
  return orderedProjects.find((project) => project.id === id)
}
