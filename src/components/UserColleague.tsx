import React from 'react';

import Button, { buttonStyleDanger, buttonStyleSecondary } from './Button';
import { TUserData } from './User';

/** colleague control description */
type TUserColleague = {
  /** colleague index */
  index: number;
  /** selected user data */
  user: TUserData;
  /** colleague data */
  colleague: TUserData;
  /** select user upon control click */
  selectUser: (user: TUserData) => void;
  /** update user */
  updateUser: (user: TUserData) => void;
};

/** colleague control */
const UserColleague: React.FC<TUserColleague> = ({
  index,
  user,
  colleague,
  selectUser,
  updateUser,
}) => {
  return (
    <div className='btn-group mb-3 mr-3' role='group'>
      <Button action={() => selectUser(colleague)} style={buttonStyleSecondary}>
        {colleague.name}
      </Button>
      <Button
        action={() => {
          const updatedColleagues = [...user.colleagues];
          updatedColleagues.splice(index, 1);
          updateUser({
            ...user,
            colleagues: updatedColleagues,
          });
        }}
        style={buttonStyleDanger}
      >
        x
      </Button>
    </div>
  );
};

export default UserColleague;
