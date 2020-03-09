type TFunction<T> = () => T;

export type TValueOrFunction<T> = T | TFunction<T>;
