import React from 'react';

// Styles & Assets
import styles from './Button.module.css';
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
        if (variant === 'primary') return styles.primaryButton;
        if (variant === 'secondary') return styles.secondaryButton;
        if (variant === 'tertiary') return styles.tertiaryButton;
    }

    const getSizeClass = () => {
        if (size === 'sm') return styles.smButton;
        if (size === 'md') return styles.mdButton;
        if (size === 'lg') return styles.lgButton;
    }

    const getCustomStyles = () => {
        const customStyles: React.CSSProperties = {};
        if (uppercase) customStyles.textTransform = 'uppercase';
        return customStyles;
    }

    return (
        <button
            {...props}
            className={`${styles.button} ${mergeClasses([props.className, getVariantClass(), getSizeClass()])}`}
            style={{ ...props.style, ...getCustomStyles() }}
        >
            {children}
        </button>
    );
};

export default Button;