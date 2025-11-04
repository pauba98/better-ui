import { useEffect } from "react";
import { ModalProps } from "./Modal";

type useModalHookProps = Pick<ModalProps, 'onClose' | 'show' | 'position'>

export const useModal = ({ show, onClose }: useModalHookProps) => {

    const handleInsideClick = (e: React.FormEvent) => {
        e.stopPropagation();
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose(e)
    }

    useEffect(() => {

        const restartScroll = () => {
            if (someModalOpened) return;
            if (document.body.style.position === 'fixed') {
                const scrollY = Number(document.body.style.top.slice(0, -2));
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.overflowY = '';
                document.body.style.top = '';
                if (!Number.isNaN(scrollY)) window.scrollTo(0, -scrollY)
            }
        }

        const someModalOpened = document.getElementById('modal-div-unique-id');

        if (show && document.body.style.position !== 'fixed') {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            if (document.body.clientHeight < document.body.scrollHeight)
                document.body.style.overflowY = 'scroll';
            else document.body.style.overflowY = '';
            document.body.style.top = `-${scrollY}px`
        }
        else restartScroll();

        return () => restartScroll();

    }, [show]);

    return { handleClick, handleInsideClick };

}