import { faTag } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button'

type Props = {
  onCreateTagClick: () => void
}

export function Header({ onCreateTagClick }: Props) {
  return (
    <header className="header">
      <div className="header__logo">🏷 Tags</div>
      <div className="header-actions">
        <Button
          text="▶ create tag"
          onClick={onCreateTagClick}
          classBtn="button--primary"
          icon={faTag}
        />
      </div>
    </header>
  )
}
