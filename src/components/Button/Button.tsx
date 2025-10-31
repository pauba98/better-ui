import React from 'react';

// Styles & Assets
import './Button.css';
import { mergeClasses } from '../../utils/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'tertiary'
    size?: 'sm' | 'md' | 'lg'
    uppercase?: boolean
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    uppercase,
    ...props
}) => {

    const getVariantClass = () => {
        if (variant === 'primary') return 'primaryButton';
        if (variant === 'secondary') return 'secondaryButton';
        if (variant === 'tertiary') return 'tertiaryButton';
    }

    const getSizeClass = () => {
        if (size === 'sm') return 'sm-button';
        if (size === 'md') return 'md-button';
        if (size === 'lg') return 'lg-button';
    }

    const getCustomStyles = () => {
        const customStyles: React.CSSProperties = {};
        if (uppercase) customStyles.textTransform = 'uppercase';
        return customStyles;
    }

    return (
        <button
            {...props}
            className={`button ${mergeClasses([props.className, getVariantClass(), getSizeClass()])}`}
            style={{ ...props.style, ...getCustomStyles() }}
        >
            {children}
        </button>
    );
};

export default Button;