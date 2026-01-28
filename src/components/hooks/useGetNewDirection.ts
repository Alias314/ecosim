import { useEffect, useRef } from 'react'
import { getDirection, getRandomRadian } from '../../utils/math';

const useGetNewDirection = (delay: number) => {
  const direction = useRef({ x: 0, z: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const radian = getRandomRadian(360);
      direction.current = getDirection(radian);
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return direction;
};

export default useGetNewDirection;