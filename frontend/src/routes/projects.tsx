import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { getProjects, deleteProject } from '../api/projectsApi'
import type { Project } from '../types/projects'
import { Header } from '../components/projects/Header'
import { ProjectItem } from '../components/projects/ProjectItem.tsx'
import { CreateProjectForm } from '../components/projects/formCreateProject'
import { EditProjectForm } from '../components/projects/EditProjectForm'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [screen, setScreen] = useState<
    'projects' | 'createProject' | 'editProject'
  >('projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

  function closeCreateProjectScreen() {
    setSelectedProject(null)
    setScreen('projects')
  }

  function openEditProjectScreen(project: Project) {
    setSelectedProject(project)
    setScreen('editProject')
  }

  function closeEditProjectScreen() {
    setSelectedProject(null)
    setScreen('projects')
  }

  async function handleProjectCreated() {
    await fetchProjects()
    setScreen('projects')
  }

  return (
    <>
      <Header onCreateProjectClick={openCreateProjectScreen} />
      <div className="main-container">
        {screen === 'projects' && (
          <>
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
                    openEditProjectScreen(project)
                  }}
                />
              ))}
          </>
        )}

        {screen === 'editProject' && selectedProject && (
          <EditProjectForm
            project={selectedProject}
            onClose={closeEditProjectScreen}
            onUpdated={() => {
              void fetchProjects()
            }}
          />
        )}
      </div>
    </>
  )
}
