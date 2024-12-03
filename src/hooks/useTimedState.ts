import React, { useState, useEffect } from 'react';

type ReturnType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  number
];

/**
 * Custom hook for managing a timed state.
 *
 * @param {number} seconds - The initial number of seconds for the timed state.
 * @return {ReturnType} An array containing the current state of the timer (boolean), a function to update the timer state (React.Dispatch<React.SetStateAction<boolean>>), and the current time (number).
 */
export const useTimedState = (seconds: number): ReturnType => {
  const [isTimer, setIsTimer] = useState<boolean>(false);
  const [time, setTime] = useState<number>(seconds);

  useEffect(() => {
    if (!isTimer) return;
    else if (isTimer && time !== 0) {
      setTimeout(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else {
      setTime(seconds);
      setIsTimer(false);
    }
  }, [isTimer, time]);

  return [isTimer, setIsTimer, time];
};
