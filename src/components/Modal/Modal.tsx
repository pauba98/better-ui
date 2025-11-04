import React from 'react';
import ReactDOM from 'react-dom';

// Styles & Assets
import styles from './Modal.module.css';
import { getOrCreatePortalRoot, mergeClasses } from '../../utils/utils';
import { useModal } from './useModal';

export interface ModalProps {
    show: boolean,
    onClose: (e: React.MouseEvent) => void,
    classesModal?: string,
    classesBackdrop?: string,
    position?: 'top' | 'center' | 'bottom'
    children: React.ReactNode,
}
const Modal: React.FC<ModalProps> = (props) => {

    const {
        show,
        onClose,
        classesModal,
        classesBackdrop,
        position = 'center',
        children
    } = props;

    const modalElement = getOrCreatePortalRoot('better-ui-root');

    const { handleClick, handleInsideClick } = useModal({ onClose, show, position });

    const getPostionClass = () => {
        if (position === 'center') return styles.centerPosition;
        if (position === 'top') return styles.topPosition;
        if (position === 'bottom') return styles.bottomPosition;
    }

    return (
        <>
            {show && ReactDOM.createPortal(
                <div
                    id={`modal-div-unique-id`}
                    className={mergeClasses([styles.Backdrop, classesBackdrop ?? ''])}
                    onClick={handleClick}
                >
                    <div
                        className={mergeClasses([styles.Modal, classesModal ?? '', getPostionClass()])}
                        style={{ display: show ? 'flex' : 'none' }}
                        onClick={handleInsideClick}
                    >
                        <div className={styles.ModalContent}>
                            {children}
                        </div>
                    </div>
                </div>
                , modalElement as HTMLElement
            )}
        </>
    );
};

export default Modal;