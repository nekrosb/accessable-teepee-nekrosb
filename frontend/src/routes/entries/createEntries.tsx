import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { ClockIn } from '#/components/clockIn'

export const Route = createFileRoute('/entries/createEntries')({
  component: createEntries,
})

function createEntries() {
  const navigate = useNavigate()
  return (
    <div className="main-container">
      <ClockIn onCloase={() => navigate({ to: '/' })} />
    </div>
  )
}
