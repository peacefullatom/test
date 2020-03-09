import React, { ReactNode } from 'react';

/** modal options */
export type TModalOptions = {
  show: boolean;
  setShow: (state: boolean) => void;
};

/** modal description */
type TModal = {
  /** modal title */
  title: string;
  /** modal content */
  content: ReactNode;
  /** modal footer (place your control buttons here) */
  buttons: ReactNode;
} & TModalOptions;

/** modal control template */
const Modal: React.FC<TModal> = ({
  show,
  title,
  content,
  buttons,
  setShow,
}) => {
  const close = () => setShow(false);
  const display = show ? 'block' : 'none';
  return (
    <div>
      <div
        className='modal fade show'
        tabIndex={-1}
        role='dialog'
        style={{ display }}
      >
        <div
          className='modal-dialog modal-dialog-scrollable modal-dialog-centered'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{title}</h5>
              <button type='button' className='close' onClick={close}>
                <span>×</span>
              </button>
            </div>
            <div className='modal-body'>{content}</div>
            <div className='modal-footer'>{buttons}</div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show' style={{ display }}></div>
    </div>
  );
};

export default Modal;
