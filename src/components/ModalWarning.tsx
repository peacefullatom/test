import React, { Fragment } from 'react';

import Button, { buttonStylePrimary, buttonStyleSecondary } from './Button';
import Modal, { TModalOptions } from './Modal';

/** modal warning description */
type TModalWarning = {
  /** action to be performed */
  action: () => void;
} & TModalOptions;

/** modal warning */
const ModalWarning: React.FC<TModalWarning> = ({ show, setShow, action }) => {
  const close = () => setShow(false);
  return (
    <Modal
      show={show}
      setShow={setShow}
      title='warning'
      content='all unsaved data will be lost'
      buttons={
        <Fragment>
          <Button
            action={() => {
              action();
              close();
            }}
            style={buttonStylePrimary}
          >
            continue
          </Button>
          <Button action={close} style={buttonStyleSecondary}>
            cancel
          </Button>
        </Fragment>
      }
    ></Modal>
  );
};

export default ModalWarning;
