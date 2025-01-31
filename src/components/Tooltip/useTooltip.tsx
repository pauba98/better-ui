// Hooks
import { useRef } from 'react';

const useTooltip = (getStylePos: (pos: DOMRect, element: HTMLInputElement) => React.CSSProperties | null) => {

    const tooltipRef = useRef<HTMLInputElement | null>(null);

    const getStyles = ( ) => {
        if(tooltipRef.current === null) return null;
        return getStylePos(tooltipRef.current.getBoundingClientRect(), tooltipRef.current);
    };

    return {tooltipRef, getStyles};
};

export default useTooltip;