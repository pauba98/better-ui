import React from 'react';

// Styles & Assets
import styles from './Input.module.css';

// Services
import { mergeClasses } from '../../utils/utils';

// Models
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, ...props }, ref) => {

    const classes = mergeClasses([styles.input, error ? styles.error : '', props.className ?? '']);

    return (
        <input
            {...props}
            ref={ref}
            className={classes}
            aria-invalid={error}
        />
    );
});

export default Input;