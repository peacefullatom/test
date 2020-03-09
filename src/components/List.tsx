import React from 'react';

import { TUserData } from './User';

/** users list description */
export type TList = {
  /** selected user */
  user?: TUserData;
  /** list of users */
  users: TUserData[];
  /** select user callback */
  selectUser: (user: TUserData) => void;
};

/** users list */
const List: React.FC<TList> = ({ user, users, selectUser }) => {
  return (
    <div>
      {!!users.length &&
        users.map((item, index) => {
          const button = user?.id === item.id ? 'success' : 'secondary';
          return (
            <div
              key={index}
              className={`btn btn-${button} btn-block my-2`}
              onClick={(): void => selectUser(item)}
            >
              {item.name || `not set`}
            </div>
          );
        })}
      {!users.length && <div className='py-2'>no users</div>}
    </div>
  );
};

export default List;
