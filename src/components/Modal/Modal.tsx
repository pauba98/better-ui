import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// Styles & Assets
import './Modal.css';


const Modal: React.FC<{
    show: boolean,
    onClose: (e: React.MouseEvent) => void,
    classesModal?: string,
    classesBackdrop?: string,
    children: React.ReactNode,
}>
    = ({ show, onClose, classesModal, classesBackdrop, children }) => {

        const handleInsideClick = (e: React.FormEvent) => {
            e.stopPropagation();
        };

        const handleClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            onClose(e)
        }

        useEffect(() => {
            if (show) {
                const scrollY = window.scrollY;
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                if (document.body.clientHeight < document.body.scrollHeight)
                    document.body.style.overflowY = 'scroll';
                else document.body.style.overflowY = '';
                document.body.style.top = `-${scrollY}px`
            }
            else {
                if (document.body.style.position === 'fixed') {
                    const scrollY = Number(document.body.style.top.slice(0, -2));
                    document.body.style.position = '';
                    document.body.style.width = '';
                    document.body.style.overflowY = '';
                    document.body.style.top = '';
                    if (!Number.isNaN(scrollY)) window.scrollTo(0, -scrollY)
                }
            }

        }, [show]);


        return (
            <>
                {show && ReactDOM.createPortal(
                    <div
                        id='modal-root'
                        className={`${'Backdrop'} ${classesBackdrop ?? ''}`}
                        onClick={handleClick}>
                        <div
                            className={`Modal ${classesModal ?? ''}`}
                            style={{
                                display: show ? 'flex' : 'none',
                            }}
                            onClick={handleInsideClick}
                        >
                            {children}
                        </div>
                    </div>
                    , document.body as HTMLElement
                )}
            </>
        );
    };

export default Modal;