import React from 'react';

/** control wrapper description */
type TUserControl = {
  id: string;
  title: string;
  required?: boolean;
};

/** control wrapper */
const UserControl: React.FC<TUserControl> = ({
  id,
  title,
  required,
  children,
}) => {
  return (
    <div className='input-group mb-3'>
      <div className='input-group-prepend'>
        <label className='input-group-text' htmlFor={id} title={title}>
          {id} {required ? '*' : ''}
        </label>
      </div>
      {children}
    </div>
  );
};

export default UserControl;
