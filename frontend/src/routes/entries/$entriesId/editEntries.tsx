import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/entries/$entriesId/editEntries')({
  component: editEntries,
})

function editEntries() {
  return <div>Hello "/entries/$entriesId/editEntries"!</div>
}
