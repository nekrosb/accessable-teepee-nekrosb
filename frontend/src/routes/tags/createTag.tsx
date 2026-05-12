import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tags/createTag')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tags/createTag"!</div>
}
