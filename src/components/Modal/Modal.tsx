import React from 'react';
import './Modal.css';

interface ModalProps {
    onClose: () => void;
    message: string;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, message, onConfirm }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
                <button className="close" onClick={onClose}>Cancel</button>
{/*                 <button className="confirm" onClick={onConfirm}>Confirm</button>
 */}            </div>
        </div>
    );
};

export default Modal;
