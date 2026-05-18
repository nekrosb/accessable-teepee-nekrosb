import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from '@tanstack/react-router'
import { getTagById } from '#/api/tagsApi'
import { EditTagForm } from '#/components/tags/EditTagForm'

export const Route = createFileRoute('/tag/$id/edit')({
  loader: async ({ params }) => {
    return await getTagById(Number(params.id))
  },
  component: edit,
})

function edit() {
  const tag = useLoaderData({ from: '/tag/$id/edit' })
  const navigate = useNavigate()
  return (
    <div className="main-container">
      <EditTagForm
        tag={tag}
        onClose={() => {
          navigate({ to: '/tags' })
        }}
      />
    </div>
  )
}
