// Hooks
import { useEffect, useRef } from 'react';

// Custom hook that returns a Patient array with the current global filters applied
const useClickOutside = ( onClickOutside: () => void, avoidRef?: React.MutableRefObject<HTMLElement | null>) => {

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (wrapperRef === null) return;

        function handleClickOutside({ target }: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(target as Node) && !avoidRef?.current?.contains(target as Node)) {
                onClickOutside();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [wrapperRef]); // eslint-disable-line react-hooks/exhaustive-deps

    return wrapperRef;
};

export default useClickOutside;