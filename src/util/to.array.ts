export default function ToArray<T>(value: T | T[]): T[] {
  if (!value) {
    return [];
  }
  if (!(value instanceof Array)) {
    return [value];
  }
  return value;
}
