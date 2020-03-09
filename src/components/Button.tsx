import React from 'react';

import { TValueOrFunction } from '../types';
import ToArray from '../util/to.array';

export const buttonStylePrimary = 'primary';
export const buttonStyleSecondary = 'secondary';
export const buttonStyleSuccess = 'success';
export const buttonStyleDanger = 'danger';
export const buttonStyleWarning = 'warning';
export const buttonStyleInfo = 'info';
export const buttonStyleLight = 'light';
export const buttonStyleDark = 'dark';
export const buttonStyleLink = 'link';

/** button description */
export type TButton = {
  /** optional button title */
  title?: string;
  /** optional button style */
  style?: string;
  /** optional button disabled state */
  disabled?: TValueOrFunction<boolean>;
  /** optional button class name */
  className?: string | string[];
  /** optional button action */
  action?: (...args: any[]) => void;
};

/** button */
const Button: React.FC<TButton> = ({
  children,
  title,
  style,
  disabled,
  className,
  action,
}) => {
  const klass = ToArray(className).join(' ');
  return (
    <button
      disabled={typeof disabled === 'function' ? disabled() : disabled}
      className={`btn btn-${style ?? buttonStylePrimary} ${klass}`}
      onClick={() => {
        if (typeof action === 'function') {
          action();
        }
      }}
    >
      {children ?? title ?? 'Ok'}
    </button>
  );
};

export default Button;
