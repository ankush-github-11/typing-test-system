import { useEffect, useState, useRef } from "react";
import { useAutoRedirect } from "../hooks/useAutoRedirect";
import Cursor from "./Cursor";

const TypingArea = () => {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [targetText] = useState(
    "developer is someone who solves problems using logic and code while continuously learning and adapting to new technologies in order to build efficient and innovative",
  );
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [wpmPerSecond, setWpmPerSecond] = useState<number[]>([]);
  // const isCurrCharSpaceAndPrevWordWasCorrect = () => {
  //     const prevCharIsSpace = targetText[index - 1] === " ";

  //     // Get last word boundaries
  //     const lastSpaceIndex = targetText.lastIndexOf(" ", index - 2);
  //     const wordStart = lastSpaceIndex + 1;
  //     const wordEnd = index - 1;

  //     const typedWord = typedText.slice(wordStart, wordEnd);
  //     const targetWord = targetText.slice(wordStart, wordEnd);

  //     const isWordCorrect = typedWord === targetWord;

  //     // LOCK: don't allow going back into correct word
  //     if (prevCharIsSpace && isWordCorrect) {
  //       return true;
  //     }
  //     return false;
  // }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!started) setStarted(true);
    // BACKSPACE
    if (e.key === "Backspace") {
      e.preventDefault();
      if (index === 0) return;
      // if(isCurrCharSpaceAndPrevWordWasCorrect()) return;
      if (index > 0) {
        setTypedText((prev) => prev.slice(0, index - 1));
        setIndex((prev) => prev - 1);
      }
      return;
    }

    // IGNORE NON-CHAR KEYS
    if (e.key.length > 1) return;

    // STOP IF LIMIT REACHED
    // if (index >= targetText.length) return;

    e.preventDefault();

    // INSERT CHARACTER AT INDEX
    setTypedText((prev) => {
      const newText = prev.slice(0, index) + e.key + prev.slice(index);
      return newText;
    });

    setIndex((prev) => prev + 1);
  };
  useEffect(() => {
    if (!started || timeLeft < 0) return;
    const timeInMinutes = (10 - timeLeft) / 60;
    if (timeInMinutes <= 0) return;
    let correctChars = 0;
    targetText.split("").forEach((char, i) => {
      if (typedText[i] === char) correctChars++;
    });
    const wpm = Math.round(correctChars / (5 * timeInMinutes));
    setWpmPerSecond((prev) => [...prev, wpm]);
  }, [timeLeft]);

  const calculateFinalResults = () => {
    let correctChars = 0;
    targetText.split("").forEach((char, i) => {
      if (typedText[i] === char) correctChars++;
    });

    const timeInMinutes = 10 / 60;
    const wpm = Math.round(correctChars / (5 * timeInMinutes));    
    const rawAccuracy = typedText.length
      ? Math.round((correctChars / typedText.length) * 100)
      : 0;
    return { wpm, rawAccuracy, typedText };
  };
  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  useEffect(() => {
    const currentChar = charRefs.current[index];
    if (currentChar) {
      const rect = currentChar.getBoundingClientRect();
      setCursorPos({
        top: rect.top,
        left: rect.left,
      });
    }
  }, [index]);

  useAutoRedirect({
    path: "/results",
    delay: 0,
    trigger: wpmPerSecond.length === 10,
    data: { ...calculateFinalResults(), wpmPerSecond: wpmPerSecond },
  });
  return (
    <div className="select-none ml-5 mt-25 text-4xl pt-[30px] pb-[30px] min-h-[35vh] h-fit w-[85%] font-mono text-gray leading-[50px]">
      <div className="text-2xl mb-4 flex justify-center">{timeLeft}s</div>
      <label htmlFor="typing-input" className="hidden">
        Typing Input
      </label>
      <input
        disabled={timeLeft === 0}
        autoComplete="off"
        id="typing-input"
        className="min-h-[35vh] w-[85%] absolute opacity-0 cursor-default"
        type="text"
        value={typedText}
        autoFocus
        onKeyDown={handleKeyDown}
      />
      {cursorPos && (
        <Cursor
          top={cursorPos.top}
          left={cursorPos.left}
          cn={!started ? "cursor" : ""}
        />
      )}
      {targetText.split("").map((char, i) => {
        const typedChar = typedText[i];
        let className = "text-gray-400";
        if (typedChar === undefined) className = "text-gray";
        else if (typedChar === char) className = "text-textcolorless";
        else className = "text-red-500 border-b-1 border-red-500";
        return (
          <span
            key={i}
            ref={(el) => {
              charRefs.current[i] = el;
            }}
            className={className}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
export default TypingArea;
