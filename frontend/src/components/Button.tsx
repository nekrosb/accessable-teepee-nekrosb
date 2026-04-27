import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
    text: string;
    onClick: () => void;
    classBtn: string;
    icon?: IconDefinition;
};

export function Button({ text, onClick, classBtn, icon }: Props) {
    const accessibilityProps = icon ? { "aria-label": text } : {};

    return (
        <button className={classBtn} onClick={onClick} {...accessibilityProps}>
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