import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getProject } from '@/projects/registry'
import ProjectGuideModal from '@/components/layout/ProjectGuideModal'

export default function ProjectDetailPage() {
  const { projectSlug } = useParams()
  const project = getProject(projectSlug)

  useEffect(() => {
    if (!project) return
    window.scrollTo(0, 0)
    const previousTitle = document.title
    document.title = project.title
    return () => {
      document.title = previousTitle
    }
  }, [project])

  if (!project || !project.Component) return <Navigate to="/not-found" replace />

  const Project = project.Component

  return (
    <>
      <Link
        to="/loyihalar"
        className="fixed left-4 top-4 z-50 flex items-center gap-1.5 rounded-full bg-black/70 px-3.5 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/85"
      >
        <ArrowLeft className="h-4 w-4" />
        Loyihalar
      </Link>
      <ProjectGuideModal project={project} />
      <Project />
    </>
  )
}
