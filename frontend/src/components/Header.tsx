import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

type props = {
    clickClockIn: () => void;
}

export function Header({ clickClockIn }: props) {
    return (
        <header className="header">
            <h1 className="header-title">Time Tracker</h1>
            <div className="header-actions">
                <Button
                    text="Clock In"
                    onClick={clickClockIn}
                    classBtn="btn clock-in"
                    icon={faRightToBracket}
                />
            </div>
        </header>
    );
}