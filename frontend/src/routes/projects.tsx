import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { getProjects, deleteProject } from '../api/projectsApi'
import type { Project } from '../types/projects'
import { Header } from '../components/projects/Header'
import { ProjectItem } from '../components/projects/ProjectItem.tsx'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  async function fetchProjects() {
    try {
      const cache = await getProjects()
      setProjects(cache)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setError(`Failed to fetch projects. Please try again later. ${error}`)
    }
  }

  useEffect(() => {
    void fetchProjects()
  }, [])

  async function handleDeleteProject(projectId: number) {
    try {
      await deleteProject(projectId)
      await fetchProjects()
    } catch (error) {
      console.error('Failed to delete project:', error)
      setError('Failed to delete project. Please try again later.')
    }
  }

  function openCreateProjectScreen() {
    navigate({ to: '/project/createProjects' })
  }

  return (
    <>
      <Header onCreateProjectClick={openCreateProjectScreen} />
      <div className="main-container">
        <h1>Projects</h1>
        <p>Welcome to the Projects page!</p>
        {error && <div className="error">{error}</div>}
        {projects.length === 0 && <p>No projects found.</p>}
        {projects.length > 0 &&
          !error &&
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              description={project.description}
              title={project.title}
              onDelete={() => {
                void handleDeleteProject(project.id)
              }}
              onEdit={() => {
                navigate({
                  to: '/project/$id/edit',
                  params: { id: String(project.id) },
                })
              }}
            />
          ))}
      </div>
    </>
  )
}
