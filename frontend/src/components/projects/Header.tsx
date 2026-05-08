import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button'

type Props = {
  onCreateProjectClick: () => void
}

export function Header({ onCreateProjectClick }: Props) {
  return (
    <header className="header">
      <div className="header__logo">⏱ Time Tracker</div>
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
