// @ts-nocheck

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

interface TimerProps {
  endDate: number;
  onComplete?: () => void;
}

function Timer({ endDate, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate - Date.now();
      
      if (difference <= 0) {
        onComplete?.();
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);
      
      if (timeLeft.days === 0 && timeLeft.hours === 0 && 
          timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-2xl font-bold text-green-800">{timeLeft.days}</div>
        <div className="text-xs text-gray-500">Days</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-2xl font-bold text-green-800">{timeLeft.hours}</div>
        <div className="text-xs text-gray-500">Hours</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-2xl font-bold text-green-800">{timeLeft.minutes}</div>
        <div className="text-xs text-gray-500">Minutes</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-2xl font-bold text-green-800">{timeLeft.seconds}</div>
        <div className="text-xs text-gray-500">Seconds</div>
      </div>
    </div>
  );
}

export default Timer;
