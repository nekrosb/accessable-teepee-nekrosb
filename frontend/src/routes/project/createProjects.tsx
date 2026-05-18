import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { CreateProjectForm } from '../../components/projects/CreateProjectForm'

export const Route = createFileRoute('/project/createProjects')({
  component: createProject,
})

function createProject() {
  const navigate = useNavigate()
  return (
    <div className="main-container">
      <CreateProjectForm onClose={() => navigate({ to: '/projects' })} />
    </div>
  )
}
