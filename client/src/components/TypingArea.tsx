import { useEffect, useMemo, useRef, useState } from "react";
import { useAutoRedirect } from "../hooks/useAutoRedirect";
import Cursor from "./Cursor";
import { useTokens } from "../hooks/useTokens";
import { useDifficultyTokenStore } from "../store/useDifficultyTokenStore";
import { useTestTimeStore } from "../store/useTestTimeStore";
import { useTestStartedStore } from "../store/useTestStartedStore";
import { useTypingAreaFocusedStore } from "../store/useTypingAreaFocusedStore";
import useCursorVisibility from "../hooks/useCursorVisibility";

const TypingArea = () => {
  const testTime = useTestTimeStore((state) => state.testTime);
  const difficulty = useDifficultyTokenStore((state) => state.difficulty);
  const { data: tokens } = useTokens({
    token_type: ["word"],
    difficulty: [difficulty],
  });

  const targetText = tokens?.map((token) => token.token_string).join(" ") || "";

  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(testTime);
  useEffect(() => {
    setTimeLeft(testTime);
  }, [testTime]);

  const started = useTestStartedStore((state) => state.testStarted);
  const setStarted = useTestStartedStore((state) => state.setTestStarted);
  const [index, setIndex] = useState(0);

  const [cursorPos, setCursorPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [avgWpmPerSecondArr, setAvgWpmPerSecondArr] = useState<number[]>([]);
  const [rawWpmPerSecondArr, setRawWpmPerSecondArr] = useState<number[]>([]);
  const [burstPerSecondArr, setBurstPerSecondArr] = useState<number[]>([]);
  const [wrongCharsPerSecondArr, setWrongCharsPerSecondArr] = useState<
    number[]
  >([]);

  const prevLengthRef = useRef(0);

  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [wrongCharsTyped, setWrongCharsTyped] = useState(0);

  const [wrongCharsTypedPerSecond, setWrongCharsTypedPerSecond] = useState(0);

  const [visibleStartLine, setVisibleStartLine] = useState(0);
  const [charsPerLine, setCharsPerLine] = useState(60);

  const focused = useTypingAreaFocusedStore((state) => state.focused);
  const setFocused = useTypingAreaFocusedStore((state) => state.setFocused);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleMouseEnter = () =>{
    inputRef.current?.focus();
  };
  const cursorVisible = useCursorVisibility(started);

  const lines = useMemo(() => { // CREATE FIXED LINES
    const words = targetText.split(" ");
    const result: string[] = [];

    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + word + " ";

      if (testLine.length > charsPerLine) {
        result.push(currentLine);
        currentLine = word + " ";
      }
      else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      result.push(currentLine);
    }

    return result;
  }, [targetText, charsPerLine]);

  useEffect(() => { // DETECT CURRENT LINE
    let totalChars = 0;

    for (let i = 0; i < lines.length; i++) {
      totalChars += lines[i].length + 1;

      if (index < totalChars) {
        if (i >= visibleStartLine + 2) { // SHIFT WHEN ENTERING 3RD LINE
          setVisibleStartLine(i - 1);
        }
        break;
      }
    }
  }, [index, lines, visibleStartLine]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // BACKSPACE HANDLING
      e.preventDefault();

      if (index === 0) return;

      setTypedText((prev) => prev.slice(0, index - 1));
      setIndex((prev) => prev - 1);

      return;
    }

    // IGNORE SPECIAL KEYS
    if (e.key.length > 1) return;
    if (!started) setStarted(true); // Start the test

    e.preventDefault();

    if (e.key !== targetText[index]) {
      setWrongCharsTyped((prev) => prev + 1);
      setWrongCharsTypedPerSecond((prev) => prev + 1);
    }

    setTotalCharsTyped((prev) => prev + 1);

    setTypedText((prev) => {
      const newText = prev.slice(0, index) + e.key + prev.slice(index);
      return newText;
    });

    setIndex((prev) => prev + 1);
  };

  const handleBlur = () => {
    if (started) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);

      return;
    }

    setFocused(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  useEffect(() => { // AVG WPM
    if (!started || timeLeft < 0) return;

    const timeInMinutes = (testTime - timeLeft) / 60;

    if (timeInMinutes <= 0) return;

    let correctChars = 0;

    targetText.split("").forEach((char, i) => {
      if (typedText[i] === char) correctChars++;
    });

    const avgWpm = Math.round(correctChars / (5 * timeInMinutes));

    setAvgWpmPerSecondArr((prev) => [...prev, avgWpm]);
  }, [timeLeft]);

  useEffect(() => { // RAW WPM
    if (!started || timeLeft < 0) return;

    const timeInMinutes = (testTime - timeLeft) / 60;

    if (timeInMinutes <= 0) return;

    const rawWpm = Math.round(typedText.length / (5 * timeInMinutes));

    setRawWpmPerSecondArr((prev) => [...prev, rawWpm]);
  }, [timeLeft]);

  useEffect(() => { // BURST WPM
    if (!started || timeLeft < 0) return;

    const currentLength = typedText.length;
    const prevLength = prevLengthRef.current;

    const charsThisSecond = Math.max(0, currentLength - prevLength);

    prevLengthRef.current = currentLength;

    const instantWpm = Math.round((charsThisSecond / 5) * 60);

    setBurstPerSecondArr((prev) => [...prev, instantWpm]);
  }, [timeLeft]);

  useEffect(() => { // WRONG CHARS PER SECOND
    if (!started || timeLeft < 0) return;

    setWrongCharsPerSecondArr((prev) => [...prev, wrongCharsTypedPerSecond]);

    setWrongCharsTypedPerSecond(0);
  }, [timeLeft]);

  useEffect(() => {
    const calculateCharsPerLine = () => {
      // 85% viewport width
      const containerWidth = window.innerWidth * 0.85;
      // text-4xl in Tailwind = 36px
      // monospace average char width ≈ 0.6 of font size
      const fontSize = 36;
      const approxCharWidth = fontSize * 0.6;
      const chars = Math.floor(containerWidth / approxCharWidth);
      setCharsPerLine(chars);
    };
    calculateCharsPerLine();
    window.addEventListener("resize", calculateCharsPerLine);
    return () => window.removeEventListener("resize", calculateCharsPerLine);
  }, []);

  const calculateFinalResults = () => { // FINAL RESULTS
    let correctChars = 0;

    targetText.split("").forEach((char, i) => {
      if (typedText[i] === char) correctChars++;
    });

    const timeInMinutes = testTime / 60;

    const wpm = Math.round(correctChars / (5 * timeInMinutes));

    const rawAccuracy = typedText.length
      ? Math.round((correctChars / typedText.length) * 100)
      : 0;

    return { wpm, rawAccuracy, typedText };
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setStarted(false);
    }
  }, [timeLeft, setStarted]);

  useEffect(() => {
    // TIMER DECREMENT
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
    // CURSOR POSITION
    const currentChar = charRefs.current[index];

    if (currentChar) {
      const rect = currentChar.getBoundingClientRect();

      setCursorPos({
        top: rect.top,
        left: rect.left,
      });
    }
  }, [index, targetText, visibleStartLine]);

  useAutoRedirect({ // REDIRECT
    path: "/results",
    delay: 0,
    trigger: avgWpmPerSecondArr.length === testTime,
    data: {
      ...calculateFinalResults(),
      testTime,
      wrongCharsTyped,
      totalCharsTyped,
      avgWpmPerSecondArr,
      burstPerSecondArr,
      rawWpmPerSecondArr,
      wrongCharsPerSecondArr,
      difficulty,
    },
  });
  return (
    <div onMouseEnter={handleMouseEnter} className={`select-none ml-5 mt-25 text-4xl pt-[30px] pb-[30px] min-h-[35vh] h-fit w-[88%] font-mono text-gray leading-[50px] overflow-hidden px-5 ${ !cursorVisible ? "cursor-none" : "cursor-default" }`}> 

      <div className={`text-2xl mb-4 flex justify-center ${started || focused ? "" : "blur-md"}`}>{timeLeft}s</div>

      <label htmlFor="typing-input" className="hidden">
        Typing Input
      </label>
      
      <div className={`relative text-textcolorless flex items-center ${started || focused ? "hidden" : ""}`}>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 !text-3xl">
          hover here to focus
        </div>
      </div>

      <input
        ref={inputRef}
        disabled={timeLeft === 0}
        autoComplete="off"
        id="typing-input"
        className={`min-h-[35vh] w-[85%] absolute opacity-0 ${ !cursorVisible ? "cursor-none" : "cursor-default" }`}
        type="text"
        value={typedText}
        autoFocus
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {cursorPos && (
        <Cursor
          top={cursorPos.top}
          left={cursorPos.left}
          cn={!started ? "cursor" : ""}
        />
      )}

      {lines
        .slice(visibleStartLine, visibleStartLine + 3)
        .map((line, lineIdx) => {
          const actualLineIndex = visibleStartLine + lineIdx;

          const charsBefore = lines
            .slice(0, actualLineIndex)
            .reduce((acc, l) => acc + l.length, 0);

          return (
            <div key={actualLineIndex} className={`${started || focused ? "" : "blur-md"}`}>
              {line.split("").map((char, charIdx) => {
                const globalIndex = charsBefore + charIdx;

                const typedChar = typedText[globalIndex];

                let className = "text-gray-400";

                if (typedChar === undefined) className = "text-gray";
                else if (typedChar === char)
                  className = "text-textcolorless";
                else
                  className =
                    "text-red-500 border-b-1 border-red-500";

                return (
                  <span
                    key={globalIndex}
                    ref={(el) => {
                      charRefs.current[globalIndex] = el;
                    }}
                    className={className}
                  >
                    {char}
                  </span>
                );
              })}

              <span> </span>
            </div>
          );
        })}
    </div>
  );
};

export default TypingArea;