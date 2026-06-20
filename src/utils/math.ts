import { MathUtils, Vector3 } from "three";

export const getRandomIntAtRange = (min, max) => {
  return MathUtils.randInt(min, max);
};

export const getRandomFloatAtRange = (min, max) => {
  return MathUtils.randFloat(min, max);
};

export const getRandomRadian = (degree) => {
  return MathUtils.degToRad(Math.random() * degree);
};

export const getDirection = (radian) => {
  const direction = new Vector3();
  direction.set(Math.cos(radian) / 100, 0, Math.sin(radian) / 100);
  return direction;
};

export const getRandomCoordinate = (range) => {
  const coordinate = new Vector3();
  coordinate.set(Math.random() * range, 0, Math.random() * range)
  return coordinate;
};