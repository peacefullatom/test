import React, { Fragment } from 'react';

import Button, { buttonStyleDanger, buttonStylePrimary, buttonStyleSuccess, buttonStyleWarning, TButton } from './Button';

/** control description */
export type TControls = {
  /** save button disabled state */
  saveDisabled: boolean;
  /** delete button disabled state */
  deleteDisabled: boolean;
  /** add button disabled state */
  addUserDisabled: boolean;
  /** save users callback */
  saveUsers: () => void;
  /** load users callback */
  loadUsers: () => void;
  /** delete user callback */
  deleteUser: () => void;
  /** add user callback */
  addUser: () => void;
};

/** controls */
const Controls: React.FC<TControls> = ({
  saveDisabled,
  deleteDisabled,
  addUserDisabled,
  saveUsers,
  loadUsers,
  deleteUser,
  addUser,
}) => {
  const buttons: TButton[] = [
    {
      style: buttonStyleSuccess,
      title: 'save changes',
      disabled: saveDisabled,
      className: 'mr-3',
      action: saveUsers,
    },
    {
      style: buttonStyleWarning,
      title: 'fetch data',
      className: 'mr-3',
      action: loadUsers,
    },
    {
      style: buttonStyleDanger,
      title: 'delete selected user',
      disabled: deleteDisabled,
      className: 'mr-3',
      action: deleteUser,
    },
    {
      style: buttonStylePrimary,
      title: 'add new user',
      disabled: addUserDisabled,
      action: addUser,
    },
  ];

  return (
    <Fragment>
      {buttons.map((button, index) => (
        <Button key={index} {...button}></Button>
      ))}
    </Fragment>
  );
};

export default Controls;
