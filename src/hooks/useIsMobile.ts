import { useState, useEffect } from "react";

export function useIsMobile(breakpoint: number): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}
