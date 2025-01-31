import React from 'react';

// Styles & Assets
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    primary?: boolean
    size?: 'small' | 'medium' | 'large'
}

const Button: React.FC<ButtonProps> = ({
    label,
    primary,
    size,
    ...props
}) => {

    return (
        <button
            className={`button ${primary ? 'primaryButton' : 'secondaryButton'}`}
            {...props}
        >
            {label}
        </button>
    );
};

export default Button;