import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@tanstack/react-router'
import { Button } from './Button'
type props = {
  isClockedIn: boolean
  clickClockIn: () => void
  clickClockOut: () => void
}

export function Header({ isClockedIn, clickClockIn, clickClockOut }: props) {
  return (
    <header className="header">
      <div className="header__logo">⏱ Time Tracker</div>
      <nav className="header-links">
        <Link to="/projects" className="header-links__item">
          Projects
        </Link>
        <Link to="/tags" className="header-links__item">
          Tags
        </Link>
      </nav>
      <div className="header-actions">
        {isClockedIn ? (
          <Button
            text="⏸ Stop Timer"
            onClick={clickClockOut}
            classBtn="button--danger"
            icon={faRightToBracket}
          />
        ) : (
          <Button
            text="▶ Start Working"
            onClick={clickClockIn}
            classBtn="button--primary"
            icon={faRightToBracket}
          />
        )}
      </div>
    </header>
  )
}
