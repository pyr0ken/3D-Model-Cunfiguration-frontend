import { useEffect } from 'react';

const useBackButtonListener = (callback) => {
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        callback();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [callback]);
};

export default useBackButtonListener;
