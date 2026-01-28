import { MathUtils } from "three";

export const getRandomNumberAtRange = (min, max) => {
  return MathUtils.randFloat(min, max);
};

export const getRandomRadian = (degree) => {
  return MathUtils.degToRad(Math.random() * degree);
};

export const getDirection = (radian) => {
  return { 
    x: Math.cos(radian) / 100, 
    z: Math.sin(radian) / 100 
  };
};