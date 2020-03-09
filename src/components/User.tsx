import React, { Fragment, useState } from 'react';

import Button from './Button';
import ModalColleagues from './ModalColleagues';
import UserColleague from './UserColleague';
import UserControl from './UserControl';

/** id of name control */
const nameId = 'name';
/** id of role control */
const roleId = 'role';
/** id of dob control */
const dobId = 'dob';
/** id of gender control */
const genderId = 'gender';
/** id of fired control */
const firedId = 'fired';
/** id of colleagues control */
const colleaguesId = 'colleagues';

/** list of user roles */
export const userRoles: string[] = [
  'choose...',
  'accountant',
  'attorney',
  'ceo',
  'cto',
  'dev',
  'devops',
  'driver',
  'guard',
  'secretary',
];

/** list of user genders */
export const userGenders: string[] = ['male', 'female'];

/** user data description */
export type TUserData = {
  /** user id */
  id: string;
  /** user name */
  name: string;
  /** user role */
  role: string;
  /** date of birth of user */
  dob: string;
  /** user gender */
  gender: string;
  /** user is fired */
  fired: boolean;
  /** list of colleagues */
  colleagues: TUserData[];
  /** new user flag */
  newUser?: boolean;
  /** changed flag */
  changed?: boolean;
};

/** user description */
export type TUser = {
  data: TUserData;
  /** list of possible colleagues */
  users: TUserData[];
  /** update user data */
  updateUser: (user: TUserData) => void;
  /** select user */
  selectUser: (user: TUserData) => void;
};

/** user control */
const User: React.FC<TUser> = ({ data, users, updateUser, selectUser }) => {
  const [showManage, setShowManage] = useState(false);
  const ids = data.colleagues.map(colleague => colleague.id);
  const list = [...users].filter(
    user => user.id !== data.id && ids.indexOf(user.id) === -1
  );
  const roles = [...userRoles];

  if (data.role) {
    roles.shift();
  }

  return (
    <Fragment>
      <ModalColleagues
        show={showManage}
        setShow={setShowManage}
        user={data}
        users={users}
        updateUser={updateUser}
      ></ModalColleagues>
      <div className='container-fluid pt-3'>
        <div className='row'>
          <div className='col'>
            <UserControl id={nameId} title='user name' required={true}>
              <input
                type='text'
                required={true}
                className='form-control'
                id={nameId}
                value={data.name}
                onChange={(event): void =>
                  updateUser({ ...data, name: event.target.value })
                }
              />
            </UserControl>
            <UserControl id={roleId} title='user role' required={true}>
              <select
                id={roleId}
                required={true}
                className='custom-select'
                value={data.role}
                onChange={(event): void =>
                  updateUser({ ...data, role: event.target.value })
                }
              >
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </UserControl>
            <UserControl id={dobId} title='date of birth'>
              <input
                type='date'
                className='form-control'
                id={dobId}
                value={data.dob}
                onChange={(event): void =>
                  updateUser({ ...data, dob: event.target.value })
                }
              />
            </UserControl>
            <div className='input-group mb-3'>
              <div className='input-group-prepend'>
                <label className='input-group-text'>{genderId}</label>
              </div>
              <div className='input-group-append'>
                {userGenders.map((gender, index) => {
                  const id = `${genderId}${index}`;
                  return (
                    <Fragment key={index}>
                      <div className='input-group-text bg-white'>
                        <input
                          type='radio'
                          name={`${genderId}Group`}
                          id={id}
                          checked={data.gender === gender}
                          onChange={(): void => updateUser({ ...data, gender })}
                        />
                      </div>
                      <label className='input-group-text bg-white' htmlFor={id}>
                        {gender}
                      </label>
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <UserControl id={firedId} title='user is fired'>
              <div className='input-group-append'>
                <div className='input-group-text'>
                  <input
                    id={firedId}
                    type='checkbox'
                    checked={data.fired}
                    onChange={(event): void =>
                      updateUser({ ...data, fired: event.target.checked })
                    }
                  />
                </div>
              </div>
            </UserControl>
            <UserControl id={colleaguesId} title={`user's colleagues`}>
              {!!list.length && (
                <div className='input-group-append'>
                  <div className='input-group'>
                    <Button action={() => setShowManage(true)}>manage</Button>
                  </div>
                </div>
              )}
            </UserControl>
            {data.colleagues.map((colleague, index) => (
              <UserColleague
                key={index}
                index={index}
                user={data}
                colleague={colleague}
                selectUser={selectUser}
                updateUser={updateUser}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default User;
