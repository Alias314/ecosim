import { useEffect, useRef } from 'react'
import { getRandomFloatAtRange } from '../../utils/math';

interface UseStartDelayParams {
  minDelay: number,
  maxDelay: number
}

const useStartDelay = ({
  minDelay, 
  maxDelay
}: UseStartDelayParams) => {
  const isReady = useRef(false);
  
  useEffect(() => {
    const delay = getRandomFloatAtRange(minDelay, maxDelay);

    const timeout = setTimeout(() => {
      isReady.current = true;
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return isReady;
}

export default useStartDelay;