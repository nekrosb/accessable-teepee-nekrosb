import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CreateTagForm } from '../../components/tags/CreateTagForm'

export const Route = createFileRoute('/tag/tagCreate')({
  component: tagCreate,
})

function tagCreate() {
  const navigate = useNavigate()
  return (
    <div className="main-container">
      <CreateTagForm
        onClose={() => {
          navigate({ to: '/tags' })
        }}
      />
    </div>
  )
}
