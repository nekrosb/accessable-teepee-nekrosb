import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
    typeBtn?: "button" | "submit" | "reset";
    text: string;
    onClick?: () => void;
    classBtn: string;
    icon?: IconDefinition;
};

export function Button({ typeBtn, text, onClick, classBtn, icon }: Props) {
    const accessibilityProps = icon ? { "aria-label": text } : {};

    return (
        <button type={typeBtn ? typeBtn : "button"} className={classBtn} onClick={onClick} {...accessibilityProps}>
            {icon ? (
                <>
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                    <span>{text}</span>
                </>
            ) : (
                text
            )}
        </button>
    );
}