import { useState } from 'react'
import { Input } from './../Input'
import { Button } from './../Button'
import { createTag } from '../../api/tagsApi'

type Props = {
  onClose: () => void
  onCreated: () => void
}

function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === 'string'
}

export function CreateTagForm({ onClose, onCreated }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreateTag(e: React.FormEvent<HTMLFormElement>) {
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
      setError('Tag title is required')
      setLoading(false)
      return
    }

    try {
      await createTag({
        title,
        description,
      })
      onCreated()
      onClose()
    } catch (err) {
      console.error('Failed to create tag:', err)
      setError('Failed to create tag')
    } finally {
      setLoading(false)
    }
  }

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
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>
          Create New Tag
        </h2>
      </div>

      <div
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {error && (
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
            ✗ {error}
          </div>
        )}

        <form
          onSubmit={handleCreateTag}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <Input
            type="text"
            name="title"
            label="Tag Title"
            placeholder="What is the name of your tag?"
          />

          <Input
            type="text"
            name="description"
            label="Description (optional)"
            placeholder="Describe your tag..."
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button
              typeBtn="submit"
              classBtn="button--success"
              text={loading ? 'Creating...' : 'Create tag'}
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
