import { idSource } from './id.const';
import RandomValue from './randomValue';

/** generate random id */
const ID = (): string => {
  const id: string[] = [];
  const template = idSource
    .split('')
    .sort(() => (Math.random() > 0.5 ? -1 : +1));

  for (let i = 0; i < 6; i++) {
    id.push(RandomValue(template));
  }

  return id.join('');
};

export default ID;
