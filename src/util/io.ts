import { useEffect, useState } from 'react';

import { ioKey } from './io.const';

export const fetch = <T>(): T => {
  return JSON.parse(localStorage.getItem(ioKey));
};

export const upload = <T>(data: T) => {
  localStorage.setItem(ioKey, JSON.stringify(data));
};
