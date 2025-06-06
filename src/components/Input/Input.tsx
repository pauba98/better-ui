import React from 'react';

// Styles & Assets
import styles from './Input.module.css';

// Models
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, ...props }, ref) => {

    return (
        <input
            {...props}
            ref={ref}
            className={`${styles.input} ${error ? styles.error : ''} ${props.className ?? ''}`}
        />
    );
});

export default Input;