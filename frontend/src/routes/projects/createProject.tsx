import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/createProject')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/projects/createProject"!</div>
}
