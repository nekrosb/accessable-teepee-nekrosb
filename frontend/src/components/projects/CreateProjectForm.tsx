import { useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { createProject } from '../../api/projectsApi'
import { isString } from '../../utils/formUtils'

type Props = {
  onClose: () => void
  onCreated: () => void
}

export function CreateProjectForm({ onClose, onCreated }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const titleValue = formData.get('title')
    const descriptionValue = formData.get('description')

    const title = isString(titleValue) ? titleValue.trim() : ''
    const description = isString(descriptionValue)
      ? descriptionValue.trim()
      : ''

    if (!title) {
      setError('Project title is required')
      setLoading(false)
      return
    }

    try {
      await createProject({
        title,
        description,
      })
      onCreated()
      onClose()
    } catch (err) {
      console.error('Failed to create project:', err)
      setError('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card">
      <div className="form-card__header">
        <h2 className="form-card__title">Create New Project</h2>
      </div>

      <div className="form-card__body">
        {error && <div className="form-card__error">✗ {error}</div>}

        <form onSubmit={handleCreateProject} className="form-card__form">
          <Input
            type="text"
            name="title"
            label="Project Title"
            placeholder="What is the name of your project?"
          />

          <Input
            type="text"
            name="description"
            label="Description (optional)"
            placeholder="Describe your project..."
          />

          <div className="form-card__actions">
            <Button
              typeBtn="submit"
              classBtn="button--success"
              text={loading ? 'Creating...' : 'Create project'}
            />
            <Button
              typeBtn="button"
              classBtn="button--secondary"
              text="Cancel"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
