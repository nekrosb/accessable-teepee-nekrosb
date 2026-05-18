import { useState, useActionState, use } from 'react'
import type { entriesFormData } from '#/types/entries'
import type { Project } from '../types/projects'
import type { Tags } from '../types/tags'
import { Input } from './Input'
import { Button } from './Button'
import { getProjects } from '../api/projectsApi'
import { getTags } from '../api/tagsApi'
import { createEntry } from '../api/entriesApi'

const project = getProjects()
const tag = getTags()

type props = {
  onCloase: () => void
  isClockedIn?: boolean
}

function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === 'string'
}

export function ClockIn({ onCloase, isClockedIn: isClockedInProp }: props) {
  const [isClockedIn, setIsClockedIn] = useState<boolean>(
    isClockedInProp ?? false,
  )
  const projects: Project[] = use(project)
  const tags: Tags[] = use(tag)

  const [state, formAction, isPending] = useActionState(
    async (_prevState, formData: FormData) => {
      const descriptionValue = formData.get('description')
      const projectValue = formData.get('project')
      const tagsIds = formData
        .getAll('tags')
        .filter(isString)
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id))

      const description = isString(descriptionValue) ? descriptionValue : ''
      const projectId = isString(projectValue) ? projectValue : ''

      if (!projectId) {
        return {
          success: false,
          error: 'Project is required',
        }
      }

      const entryData: entriesFormData = {
        description: description || '',
        project_id: Number(projectId),
        tagIds: tagsIds,
      }

      try {
        await createEntry(entryData)
        setIsClockedIn(true)
        onCloase()
        return { success: true, error: null }
      } catch (err) {
        console.error('Failed to create entry:', err)
        return {
          success: false,
          error: 'Failed to create entry',
        }
      }
    },
    { success: true, error: null },
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
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>
          Start New Task
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
            name="description"
            label="Description (optional)"
            placeholder="What are you working on?"
          />

          <div>
            <label
              style={{
                display: 'block',
                color: 'var(--text-primary)',
                fontWeight: '600',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
              }}
            >
              Project *
            </label>
            <select name="project" className="input" style={{ width: '100%' }}>
              <option value="">Select a project...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                color: 'var(--text-primary)',
                fontWeight: '600',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
              }}
            >
              Tags (optional)
            </label>
            <select
              name="tags"
              multiple
              className="input"
              style={{ width: '100%', height: '120px' }}
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.title}
                </option>
              ))}
            </select>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginTop: '0.5rem',
              }}
            >
              Hold Ctrl/Cmd to select multiple.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {!isClockedIn ? (
              <>
                <Button
                  typeBtn="submit"
                  classBtn="button--success"
                  text={isPending ? 'Loading...' : '▶ Start Task'}
                />
                <Button
                  typeBtn="button"
                  classBtn="button--secondary"
                  text="Cancel"
                  onClick={onCloase}
                />
              </>
            ) : (
              <>
                <Button
                  typeBtn="button"
                  classBtn="button--secondary"
                  text="Close"
                  onClick={onCloase}
                />
              </>
            )}
          </div>
        </form>

        {isClockedIn && (
          <div
            style={{
              padding: '1rem',
              background: 'rgba(16, 185, 129, 0.1)',
              borderLeft: '3px solid var(--color-success-500)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            ✓ You are already clocked in
          </div>
        )}
      </div>
    </div>
  )
}
