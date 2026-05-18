import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tag/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tags/id/edit"!</div>
}
