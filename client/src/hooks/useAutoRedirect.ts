import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type TypingResult = {
  wpm: number;
  rawAccuracy: number;
  typedText: string;
  wpmPerSecond: number[];
};
interface useAutoRedirectProps {
  path: string;
  delay: number;
  trigger: boolean;
  data: TypingResult;
}

export function useAutoRedirect({ path, delay, trigger, data }: useAutoRedirectProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!trigger) return;

    const timer = setTimeout(() => {
      navigate(path, { state: data });
    }, delay);

    return () => clearTimeout(timer);
  }, [trigger, path, delay, data, navigate]);
}