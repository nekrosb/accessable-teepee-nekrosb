import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";



export function Header() {

    return (
        <header className="header">
            <div className="header__logo">⏱ Time Tracker</div>
            <div className="header-actions">
                <Button text="▶ create project" onClick={() => {}} classBtn="button--primary" icon={faRightToBracket} />
            </div>
        </header>
    );
}