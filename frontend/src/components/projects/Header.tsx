import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@tanstack/react-router'
import { Button } from '../Button'

type Props = {
  onCreateProjectClick: () => void
}

export function Header({ onCreateProjectClick }: Props) {
  return (
    <header className="header">
      <div className="header__logo">⏱ Time Tracker</div>
      <nav className="header-links">
        <Link to="/" className="header-links__item">
          Entries
        </Link>
        <Link to="/tags" className="header-links__item">
          Tags
        </Link>
      </nav>
      <div className="header-actions">
        <Button
          text="▶ create project"
          onClick={onCreateProjectClick}
          classBtn="button--primary"
          icon={faRightToBracket}
        />
      </div>
    </header>
  )
}
