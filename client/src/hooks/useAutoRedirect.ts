import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface useAutoRedirectProps {
  path: string;
  delay: number;
  trigger: string;
}

export function useAutoRedirect({ path, delay, trigger }: useAutoRedirectProps) {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // Start timer only once when user starts typing
    if (!startedRef.current && trigger.length > 0) {
      startedRef.current = true;

      timerRef.current = setTimeout(() => {
        navigate(path);
      }, delay);
    }
  }, [trigger, path, delay, navigate]);

  // Cleanup only on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
}