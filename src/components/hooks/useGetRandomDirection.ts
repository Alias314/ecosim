import { useEffect, useMemo } from 'react'
import { getDirection, getRandomRadian } from '../../utils/math';
import { Vector3 } from 'three';

const useGetRandomDirection = (delay) => {
  const direction = useMemo(() => new Vector3(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      const radian = getRandomRadian(360);
      direction.copy(getDirection(radian));
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return direction;
};

export default useGetRandomDirection;