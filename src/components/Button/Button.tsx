import React from 'react';

// Styles & Assets
// import styles from './Button.module.css';

interface ButtonProps {
    label: string
}

const Button: React.FC<ButtonProps> = ({
    label
}) => {

    return (
        <button>{label}</button>
    );
};

export default Button;