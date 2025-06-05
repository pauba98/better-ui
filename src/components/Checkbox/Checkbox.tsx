import React, { useRef } from 'react';

// Styles & Assets
import './Checkbox.css';

export interface CheckboxProps {
    children: React.ReactNode
    defaultChecked?: boolean // default checked. only works if checkbox is uncontrolled
    size?: number
    disabled?: boolean
    onClick?: (checked: boolean) => void,
    color?: string
    reverse?: boolean
    style?: React.CSSProperties
    className?: string
}


const Checkbox: React.FC<CheckboxProps> = ({
    children,
    defaultChecked,
    size,
    disabled,
    onClick,
    color,
    reverse,
    style,
    className
}) => {

    const uncontrolledRef = useRef<HTMLInputElement>(null);

    const handleClickUncontrolled = () => {
        if (uncontrolledRef.current) {
            uncontrolledRef.current.checked = !uncontrolledRef.current.checked;
            onClick?.(uncontrolledRef.current.checked);
        }
    };

    const handleClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (uncontrolledRef.current) onClick?.(uncontrolledRef.current.checked);
    };

    const styleCheckbox: React.CSSProperties = {
        accentColor: color,
        height: size ? size + 'px' : undefined,
        width: size ? size + 'px' : undefined,
    }

    return (
        <button
            disabled={disabled}
            className={`checkboxButton ${className ?? ''}`}
            style={{ ...style, flexDirection: reverse ? 'row-reverse' : 'row' }}
            onClick={handleClickUncontrolled}
        >
            <input
                ref={uncontrolledRef}
                className='checkbox'
                style={styleCheckbox}
                type='checkbox'
                defaultChecked={defaultChecked}
                disabled={disabled}
                onClick={handleClickInput}
            >
            </input>
            <div className='childrenContainer'>
                {children}
            </div>
        </button>
    );
};

export default Checkbox;