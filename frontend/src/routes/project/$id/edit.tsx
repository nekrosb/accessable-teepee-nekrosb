import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useLoaderData } from '@tanstack/react-router'
import { getProjectById } from '../../../api/projectsApi'
import { EditProjectForm } from '../../../components/projects/EditProjectForm'

export const Route = createFileRoute('/project/$id/edit')({
  loader: async ({ params }) => {
    return await getProjectById(Number(params.id))
  },
  component: edit,
})

function edit() {
  const projectData = useLoaderData({ from: '/project/$id/edit' })
  const navigate = useNavigate()
  return (
    <div className="main-container">
      <EditProjectForm
        project={projectData}
        onClose={() => navigate({ to: '/projects' })}
      />
    </div>
  )
}
