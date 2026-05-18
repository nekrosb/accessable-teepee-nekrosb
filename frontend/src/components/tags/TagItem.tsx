import { Button } from '../Button'

type Props = {
  title: string
  description: string | null
  onDelete: () => void
  onEdit: () => void
}

export function TagItem({ title, description, onDelete, onEdit }: Props) {
  return (
    <div className="task">
      <div className="task__content">
        <div className="task__title">{title}</div>
        <div className="task__meta">{description || 'No description'}</div>
        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
          <Button
            text="Edit"
            onClick={onEdit}
            classBtn="button--secondary button--sm"
          />
          <Button
            text="Delete"
            onClick={onDelete}
            classBtn="button--danger button--sm"
          />
        </div>
      </div>
    </div>
  )
}
