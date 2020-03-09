import React, { Fragment, useEffect, useState } from 'react';

import Controls, { TControls } from './components/Controls';
import List from './components/List';
import ModalWarning from './components/ModalWarning';
import User, { TUserData } from './components/User';
import ID from './util/id';
import { fetch, upload } from './util/io';

type TApp = {};

const App: React.FC<TApp> = () => {
  const [user, setUser] = useState<TUserData>();
  const [users, setUsers] = useState<TUserData[]>([]);
  const [initialUsers, setInitialUsers] = useState<TUserData[]>(users);
  const [addUserDisabled, setAddUserDisabled] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const saveUsers = (): void => {
    const savedUsers = users.map(({ newUser, changed, ...rest }) => rest);
    upload(savedUsers);
    setUsers(savedUsers);
    setInitialUsers(savedUsers);
  };

  const performFetch = (): void => {
    const data = fetch<TUserData[]>();
    if (data) {
      setUsers(data);
      setInitialUsers(data);
      setUser(null);
    } else {
      console.warn('failed to fetch data');
    }
  };

  const loadUsers = (): void => {
    if (!saveDisabled) {
      setShowWarning(true);
    } else {
      performFetch();
    }
  };

  const selectUser = (user: TUserData): void => {
    setUser(user);
    if (!user.newUser) {
      setUsers(users.filter(u => !u.newUser));
    }
    setDeleteDisabled(false);
  };

  const addUser = (): void => {
    if (!users.find(u => u.newUser)) {
      const newUser: TUserData = {
        id: ID(),
        newUser: true,
        name: '',
        role: '',
        dob: '',
        gender: '',
        fired: false,
        colleagues: [],
      };
      setUsers([...users, newUser]);
      selectUser(newUser);
    }
  };

  const deleteUser = (): void => {
    const leftUsers = users
      .filter(u => u.id !== user.id)
      .map(u => ({
        ...u,
        colleagues: u.colleagues.filter(c => c.id !== user.id),
      }));
    setUsers(leftUsers);
    setUser(null);
    setDeleteDisabled(true);
  };

  const updateUser = (u: TUserData): void => {
    const updatedUser: TUserData = {
      ...u,
      changed: true,
      newUser: !(u.name && u.role),
    };
    setUser(updatedUser);
  };

  useEffect(() => {
    if (user) {
      const index = users.findIndex(v => v.id === user.id);
      if (index !== -1) {
        const data = [...users];
        data[index] = user;
        setUsers(data);
      }
    }
  }, [user]);

  useEffect(() => {
    setAddUserDisabled(!!users.find(u => u.newUser));
    const pure = users.filter(u => !u.newUser);
    const changed =
      pure.some(u => u.changed) || pure.length !== initialUsers.length;
    setSaveDisabled(!changed);
  }, [users]);

  const controls: TControls = {
    saveDisabled,
    deleteDisabled,
    addUserDisabled,
    saveUsers,
    loadUsers,
    deleteUser,
    addUser,
  };

  return (
    <Fragment>
      <ModalWarning
        show={showWarning}
        setShow={setShowWarning}
        action={() => performFetch()}
      ></ModalWarning>
      <div className='container pt-3'>
        <div className='row'>
          <div className='col py-3'>
            <Controls {...controls}></Controls>
          </div>
        </div>
        <div className='row'>
          <div className='col-4 py-3 border bg-light'>users</div>
          <div className='col-8 py-3 border bg-light'>user</div>
        </div>
        <div className='row'>
          <div className='col-4 border'>
            <List user={user} users={users} selectUser={selectUser} />
          </div>
          <div className='col-8 border'>
            {user && (
              <User
                data={user}
                users={users}
                updateUser={updateUser}
                selectUser={selectUser}
              />
            )}
            {!user && <div className='py-2'>select user or add user</div>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
