import { Code2, LayoutTemplate, Palette, Terminal, GitBranch, Atom, Database, Puzzle, Zap, Braces, Layers } from 'lucide-react'

const ICONS = {
  Code2,
  'layout-template': LayoutTemplate,
  palette: Palette,
  python: Terminal,
  'git-branch': GitBranch,
  git: GitBranch,
  github: GitBranch,
  react: Atom,
  database: Database,
  puzzle: Puzzle,
  zap: Zap,
  braces: Braces,
  layers: Layers,
}

export function resolveCourseIcon(iconName) {
  return ICONS[iconName] ?? Code2
}
