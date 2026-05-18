import { useActionState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { createProject } from '../../api/projectsApi'
import { isString } from '../../utils/formUtils'

type Props = {
  onClose: () => void
}

export function CreateProjectForm({ onClose }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState, formData: FormData) => {
      const titleValue = formData.get('title')
      const descriptionValue = formData.get('description')

      const title = isString(titleValue) ? titleValue.trim() : ''
      const description = isString(descriptionValue)
        ? descriptionValue.trim()
        : ''

      if (!title) {
        return {
          success: false,
          error: 'Project title is required',
        }
      }

      try {
        await createProject({
          title,
          description,
        })
        onClose()
      } catch (err) {
        console.error('Failed to create project:', err)
        return {
          success: false,
          error: 'Failed to create project. Please try again later.',
        }
      }
    },
    { success: false, error: null },
  )

  return (
    <div className="form-card">
      <div className="form-card__header">
        <h2 className="form-card__title">Create New Project</h2>
      </div>

      <div className="form-card__body">
        {state.error && <div className="form-card__error">✗ {state.error}</div>}

        <form action={formAction} className="form-card__form">
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
              text={isPending ? 'Creating...' : 'Create project'}
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
