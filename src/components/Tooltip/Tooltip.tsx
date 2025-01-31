import React from 'react';
import ReactDOM from 'react-dom';

// Styles & Assets
import './Tooltip.css';

// Hooks
import { useState, useRef } from 'react';
import useTooltip from './useTooltip';

const Tooltip: React.FC<{
    children: React.ReactNode,
    text: string | React.JSX.Element,
    styles?: React.CSSProperties
}> = ({ children, text, styles }) => {

    const popupRef = useRef<HTMLDivElement | null>(null);

    const getStylePos = (pos: DOMRect, element: HTMLInputElement) => {
        // TO-DO: posar a sota o a l'esquerra si quedaria fora del viewport
        console.log(pos.top)
        console.log(window.scrollY)
        return {
            top: `${pos.top + window.scrollY - 5}px`,
            left: `${pos.left + window.scrollX + element.offsetWidth / 2}px`,
            transform: 'translate(-50%, -100%)'
        };
    };

    const { tooltipRef, getStyles } = useTooltip(getStylePos);

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <div
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className='tooltip'
                ref={tooltipRef}
            >
                {children}
            </div>
            {visible && ReactDOM.createPortal(
                <>
                    <div
                        ref={popupRef}
                        style={tooltipRef.current ? {
                            ...getStyles(),
                            ...styles
                        } : styles}
                        className='tooltipText'
                    >
                        {text}
                    </div>
                </>, document.body as HTMLElement,
            )}
        </>
    );
};

export default Tooltip;