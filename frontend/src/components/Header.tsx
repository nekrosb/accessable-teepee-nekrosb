import { useEffect, useState } from "react";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { checkClockInStatus } from "#/api/entriesApi";

type props = {
    clickClockIn: () => void;
    clickClockOut: () => void;
}

export function Header({ clickClockIn, clickClockOut }: props) {
    const [isClockedIn, setIsClockedIn] = useState(false);

    useEffect(() => {
        checkClockInStatus().then(data => setIsClockedIn(data));
    }, []); 

    return (
        <header className="header">
            <h1 className="header-title">Time Tracker</h1>
            <div className="header-actions">
        {isClockedIn ?                 <Button text="Clock Out" onClick={clickClockOut} classBtn="btn clock-out" icon={faRightToBracket} /> :                <Button text="Clock In" onClick={clickClockIn} classBtn="btn clock-in" icon={faRightToBracket} /> }
            </div>
        </header>
    );
}