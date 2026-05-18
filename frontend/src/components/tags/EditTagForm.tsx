import { useActionState } from 'react'
import { Input } from './../Input'
import { Button } from './../Button'
import { updateTag } from '../../api/tagsApi'
import type { Tags } from '../../types/tags'

type Props = {
  tag: Tags
  onClose: () => void
}

function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === 'string'
}

export function EditTagForm({ tag, onClose }: Props) {
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
        await updateTag(tag.id, {
          title,
          description,
        })

        onClose()
      } catch (err) {
        console.error('Failed to update tag:', err)
        return {
          success: false,
          error: 'Failed to update tag',
        }
      }
    },
    {
      success: true,
      error: null,
    },
  )

  return (
    <div
      style={{
        background: 'var(--bg-primary)',
        borderRadius: '12px',
        overflow: 'hidden',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          background:
            'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          padding: '2rem',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Edit Tag</h2>
      </div>

      <div
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {state.error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              borderLeft: '3px solid var(--color-danger-500)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            ✗ {state.error}
          </div>
        )}

        <form
          action={formAction}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <Input
            type="text"
            name="title"
            label="Tag Title"
            placeholder="What is the name of your tag?"
            defaultValue={tag.title}
          />

          <Input
            type="text"
            name="description"
            label="Description (optional)"
            placeholder="Describe your tag..."
            defaultValue={tag.description ?? ''}
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button
              typeBtn="submit"
              classBtn="button--success"
              text={isPending ? 'Saving...' : 'Save changes'}
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
