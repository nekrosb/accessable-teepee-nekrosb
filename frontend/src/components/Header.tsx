import {  } from "react";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
type props = {
    isClockedIn: boolean;
    clickClockIn: () => void;
    clickClockOut: () => void;
}

export function Header({ isClockedIn, clickClockIn, clickClockOut }: props) {

    return (
        <header className="header">
            <div className="header__logo">⏱ Time Tracker</div>
            <div className="header-actions">
                {isClockedIn ? (
                    <Button text="⏸ Stop Timer" onClick={clickClockOut} classBtn="button--danger" icon={faRightToBracket} />
                ) : (
                    <Button text="▶ Start Working" onClick={clickClockIn} classBtn="button--primary" icon={faRightToBracket} />
                )}
            </div>
        </header>
    );
}