// src/hooks/useCursorVisibility.ts

import { useEffect, useState } from "react";

const useCursorVisibility = (testStarted: boolean) => {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!testStarted) {
      setCursorVisible(true);
      return;
    }

    // Hide cursor when test starts
    setCursorVisible(false);

    const handleMouseMove = () => {
      setCursorVisible(true);
    };

    const handleKeyDown = () => {
      setCursorVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [testStarted]);

  return cursorVisible;
};

export default useCursorVisibility;