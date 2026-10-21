"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let raf = 0;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export function Counter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const value = useCountUp(target);
  return (
    <>
      {prefix}
      {value}
      {suffix}
    </>
  );
}
