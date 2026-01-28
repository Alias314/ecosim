import { useEffect, useRef } from 'react'
import { getRandomNumberAtRange } from '../../utils/math';

const useStartDelay = (minDelay: number, maxDelay: number) => {
  const isReady = useRef(false);
  
  useEffect(() => {
    const delay = getRandomNumberAtRange(minDelay, maxDelay);

    const timeout = setTimeout(() => {
      isReady.current = true;
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return isReady;
}

export default useStartDelay;