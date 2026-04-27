import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

export function Header() {
    return (
        <header className="header">
            <h1 className="header-title">Time Tracker</h1>
            <div className="header-actions">
                <Button
                    text="Clock In"
                    onClick={() => {}}
                    classBtn="btn clock-in"
                    icon={faRightToBracket}
                />
            </div>
        </header>
    );
}