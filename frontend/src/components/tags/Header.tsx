import { faTag } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@tanstack/react-router'
import { Button } from '../Button'

type Props = {
  onCreateTagClick: () => void
}

export function Header({ onCreateTagClick }: Props) {
  return (
    <header className="header">
      <div className="header__logo">🏷 Tags</div>
      <nav className="header-links">
        <Link to="/" className="header-links__item">
          Entries
        </Link>
        <Link to="/projects" className="header-links__item">
          Projects
        </Link>
      </nav>
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
