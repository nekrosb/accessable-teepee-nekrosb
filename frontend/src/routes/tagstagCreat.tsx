import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tagstagCreat')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tagstagCreat"!</div>
}
