import { useEffect, useState } from "react";

const useMinimumLoader = (
  isLoading: boolean,
  minimumDuration = 1500
) => {
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumTimePassed(true);
    }, minimumDuration);

    return () => clearTimeout(timer);
  }, [minimumDuration]);

  return isLoading || !minimumTimePassed;
};

export default useMinimumLoader;