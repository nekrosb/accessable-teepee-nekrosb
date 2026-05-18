import { use, useActionState } from 'react'
import type { Project } from '../types/projects'
import type { Tags } from '../types/tags'
import type { UpdateEntryRequest, Entry } from '../types/entries'
import { Input } from './Input'
import { Button } from './Button'
import { getProjects } from '../api/projectsApi'
import { getTags } from '../api/tagsApi'
import { updateEntry } from '../api/entriesApi'

function toDatetimeLocalValue(value: string | undefined) {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  const pad = (part: number) => String(part).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function toIsoString(value: string) {
  return new Date(value).toISOString()
}

const project = getProjects()
const tag = getTags()

function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === 'string'
}

type props = {
  onCloase: () => void
  entry: Entry
}

export function EditEntryForm({ onCloase, entry }: props) {
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
      const startTimeValue = formData.get('start_time')
      const finishTimeValue = formData.get('finish_time')

      if (startTimeValue && !isString(startTimeValue)) {
        return {
          success: false,
          error: 'Invalid start time',
        }
      }

      if (finishTimeValue && !isString(finishTimeValue)) {
        return {
          success: false,
          error: 'Invalid finish time',
        }
      }

      const description = isString(descriptionValue) ? descriptionValue : ''
      const projectId = isString(projectValue) ? projectValue : ''

      if (!projectId) {
        return {
          success: false,
          error: 'Project is required',
        }
      }

      const entryData: UpdateEntryRequest = {
        description: description || '',
        project_id: Number(projectId),
        start_time: startTimeValue ? toIsoString(startTimeValue) : undefined,
        finish_time: finishTimeValue ? toIsoString(finishTimeValue) : undefined,
        tagIds: tagsIds,
      }

      try {
        await updateEntry(entry.id, entryData)
        onCloase()
        return { success: true, error: null }
      } catch (err) {
        console.error('Failed to update entry:', err)
        return {
          success: false,
          error: `Failed to update entry ${err instanceof Error ? err.message : 'Unknown error'}`,
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
        maxWidth: '720px',
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
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Edit Entry</h2>
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
            label="Description"
            placeholder="What changed?"
            defaultValue={entry.description}
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
            <select
              name="project"
              className="input"
              style={{ width: '100%' }}
              defaultValue={entry.project_id ?? ''}
            >
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
              Tags
            </label>
            <select
              name="tags"
              multiple
              className="input"
              style={{ width: '100%', height: '120px' }}
              defaultValue={entry.tags.map((tag) => String(tag.id))}
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            <Input
              type="datetime-local"
              name="start_time"
              label="Start time"
              placeholder=""
              defaultValue={
                entry.start_time ? toDatetimeLocalValue(entry.start_time) : ''
              }
            />

            <Input
              type="datetime-local"
              name="finish_time"
              label="Finish time"
              placeholder=""
              defaultValue={
                entry.finish_time ? toDatetimeLocalValue(entry.finish_time) : ''
              }
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button
              typeBtn="submit"
              classBtn="button--success"
              text={isPending ? 'Saving...' : 'Save Changes'}
            />
            <Button
              typeBtn="button"
              classBtn="button--secondary"
              text="Cancel"
              onClick={onCloase}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
