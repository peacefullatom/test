import React, { Fragment, useState } from 'react';

import Button, { buttonStyleDanger, buttonStylePrimary, buttonStyleSecondary, buttonStyleSuccess } from './Button';
import Modal, { TModalOptions } from './Modal';
import { TUserData } from './User';

/** modal colleagues description */
type TModalColleagues = {
  /** selected user */
  user: TUserData;
  /** list of users */
  users: TUserData[];
  /** update user callback */
  updateUser: (user: TUserData) => void;
} & TModalOptions;

/** modal colleagues */
const ModalColleagues: React.FC<TModalColleagues> = ({
  show,
  setShow,
  user,
  users,
  updateUser,
}) => {
  const close = () => {
    setSelected([]);
    setShow(false);
  };
  const possible: TUserData[] = users.filter(
    u => u.id !== user.id && user.colleagues.map(c => c.id).indexOf(u.id) === -1
  );
  const [selected, setSelected] = useState<TUserData[]>([]);

  return (
    <Modal
      show={show}
      setShow={close}
      title='manage colleagues'
      content={possible.map((item, index) => {
        const selection = !!selected.find(s => s.id === item.id);
        const style = selection ? buttonStyleSuccess : buttonStylePrimary;
        return (
          <div key={index} className='btn-group mb-3 mr-3' role='group'>
            <Button
              action={() => {
                if (!selection) {
                  setSelected([...selected, item]);
                }
              }}
              style={style}
            >
              {item.name}
            </Button>
            {selection && (
              <Button
                action={() => {
                  const update = [...selected];
                  update.splice(selected.map(s => s.id).indexOf(item.id), 1);
                  setSelected(update);
                }}
                style={buttonStyleDanger}
              >
                x
              </Button>
            )}
          </div>
        );
      })}
      buttons={
        <Fragment>
          <Button
            action={() => {
              updateUser({ ...user, colleagues: [...selected] });
              close();
            }}
            disabled={!selected.length}
            style={buttonStylePrimary}
          >
            add
          </Button>
          <Button action={close} style={buttonStyleSecondary}>
            cancel
          </Button>
        </Fragment>
      }
    ></Modal>
  );
};

export default ModalColleagues;
