/** get random value from array */
const RandomValue = <T>(values: T[]): T =>
  values[Math.floor(Math.random() * values.length)];

export default RandomValue;
