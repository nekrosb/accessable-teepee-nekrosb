import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { use } from 'react'
import { getEntriesById } from '#/api/entriesApi'
import { EditEntryForm } from '#/components/EditForm'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/entries/$id/edit')({
  loader: async ({ params }) => {
    return await getEntriesById(Number(params.id))
  },
  component: editEntries,
})

function editEntries() {
  const entryData = useLoaderData({ from: '/entries/$id/edit' })
  const navigate = useNavigate()
  return (
    <div className="main -container">
      <EditEntryForm onCloase={() => navigate({ to: '/' })} entry={entryData} />
    </div>
  )
}
