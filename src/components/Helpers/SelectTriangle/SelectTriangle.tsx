import React from 'react';

// Styles & Assets
import styles from './SelectTriangle.module.css';

// Interfaces
interface Props{
    show: boolean
}

const SelectTriangle: React.FC<Props> = ({show}) => {

    return (
        <div className={`${styles.triangle} ${show ? styles.up : styles.down}`}></div>
    );
};

export default SelectTriangle;