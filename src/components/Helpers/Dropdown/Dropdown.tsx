import React from 'react';
import ReactDOM from 'react-dom';

// Styles & Assets
import styles from './Dropdown.module.css';

// Hooks
import useClickOutside from '../../../hooks/useClickOutside';
import { CSSProperties, useCallback, useEffect, useState } from 'react';

// Interfaces
interface Props {
    show: boolean
    elementRef: React.MutableRefObject<HTMLElement | null>
    style?: CSSProperties
    handleClickOutside: () => void
    children: React.ReactNode
}

const Dropdown: React.FC<Props> = ({ show, elementRef, handleClickOutside, style, children }) => {

    const wrapperRef = useClickOutside(handleClickOutside, elementRef);

    const [stylesPos, setStylesPos] = useState<CSSProperties>();


    const getStylePos = useCallback((pos: DOMRect, element: HTMLElement) => {
        const top = pos.bottom + (wrapperRef.current?.offsetHeight ?? 0) >= window.innerHeight - 10;
        const postHeight = top ?
            { top: `${pos.top - 5}px`, transform: 'translate(-50%, -100%)' }
            :
            { top: `${pos.bottom + 5}px`, transform: 'translate(-50%, 0%)' }
        return {
            ...postHeight,
            left: `${pos.left + window.scrollX + element.offsetWidth / 2}px`,
            width: element.offsetWidth,
        };
    }, [wrapperRef]);

    useEffect(() => {
        if (elementRef.current === null) return;
        setStylesPos(getStylePos(elementRef.current.getBoundingClientRect(), elementRef.current));
    }, [elementRef, getStylePos, show])

    return (
        <>
            {show && ReactDOM.createPortal(
                <div
                    className={styles.optionsDropdown}
                    style={{ ...stylesPos, ...style }}
                    ref={wrapperRef}
                >
                    {children}
                </div>
                , document.body)
            }
        </>
    );
};

export default Dropdown;