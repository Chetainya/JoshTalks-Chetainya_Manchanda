import { createPortal } from 'react-dom';

export default function Modal({  children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      
      <dialog open className="modal">
        {children}
      </dialog>
    </>,
    document.getElementById('modal')
  );
}
