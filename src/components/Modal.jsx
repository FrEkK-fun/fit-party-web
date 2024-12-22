import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  const handleClose = () => {
    dialog.current.close();
    if (onClose) {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialog}
      onClose={handleClose}
      className="rounded-lg bg-background-color-secondary p-6 text-text-primary backdrop:bg-black/50 dark:bg-background-color-secondary-dark dark:text-text-primary-dark"
    >
      <div className="flex flex-col gap-6">
        <div>
          <button onClick={handleClose} className="absolute right-4 top-4">
            <FontAwesomeIcon
              icon={byPrefixAndName.fas[`circle-xmark`]}
              className="text-3xl text-color-system-accent-pink hover:text-color-system-accent-pink-dark"
            />
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.getElementById('modal')
  );
}
