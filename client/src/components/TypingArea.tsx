import { useEffect, useMemo, useRef, useState } from "react";
import { useAutoRedirect } from "../hooks/useAutoRedirect";
import Cursor from "./Cursor";
import { useTokens } from "../hooks/useTokens";

const TypingArea = () => {
  const variableTime = 15;

  const { data: tokens } = useTokens({
    token_type: ["word"],
    difficulty: ["easy"],
  });

  const targetText =
    tokens?.map((token) => token.token_string).join(" ") || "";

  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(variableTime);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);

  const [cursorPos, setCursorPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [avgWpmPerSecondArr, setAvgWpmPerSecondArr] = useState<number[]>([]);
  const [rawWpmPerSecondArr, setRawWpmPerSecondArr] = useState<number[]>([]);
  const [burstPerSecondArr, setBurstPerSecondArr] = useState<number[]>([]);
  const [wrongCharsPerSecondArr, setWrongCharsPerSecondArr] = useState<number[]>([]);

  const prevLengthRef = useRef(0);

  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [wrongCharsTyped, setWrongCharsTyped] = useState(0);

  const [wrongCharsTypedPerSecond, setWrongCharsTypedPerSecond] = useState(0);

  const [visibleStartLine, setVisibleStartLine] = useState(0);
  const [charsPerLine, setCharsPerLine] = useState(60);

  const lines = useMemo(() => { // CREATE FIXED LINES
    const words = targetText.split(" ");
    const result: string[] = [];

    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + word + " ";

      if (testLine.length > charsPerLine) {
        result.push(currentLine.trim());
        currentLine = word + " ";
      }
      else {
        currentLine = testLine;
      }
    });

    if (currentLine.trim()) {
      result.push(currentLine.trim());
    }

    return result;
  }, [targetText, charsPerLine]);

  useEffect(() => {   // DETECT CURRENT LINE
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
    if (!started) setStarted(true);

    if (e.key === "Backspace") {     // BACKSPACE HANDLING
      e.preventDefault();

      if (index === 0) return;

      setTypedText((prev) => prev.slice(0, index - 1));
      setIndex((prev) => prev - 1);

      return;
    }

    // IGNORE SPECIAL KEYS
    if (e.key.length > 1) return;

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

  useEffect(() => { // AVG WPM
    if (!started || timeLeft < 0) return;

    const timeInMinutes = (variableTime - timeLeft) / 60;

    if (timeInMinutes <= 0) return;

    let correctChars = 0;

    targetText.split("").forEach((char, i) => {
      if (typedText[i] === char) correctChars++;
    });

    const avgWpm = Math.round(correctChars / (5 * timeInMinutes));

    setAvgWpmPerSecondArr((prev) => [...prev, avgWpm]);
  }, [timeLeft]);

  useEffect(() => {// RAW WPM
    if (!started || timeLeft < 0) return;

    const timeInMinutes = (variableTime - timeLeft) / 60;

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

    setWrongCharsPerSecondArr((prev) => [
      ...prev,
      wrongCharsTypedPerSecond,
    ]);

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
  return () =>
    window.removeEventListener("resize", calculateCharsPerLine);
  }, []);

  const calculateFinalResults = () => { // FINAL RESULTS
    let correctChars = 0;

    targetText.split("").forEach((char, i) => {
      if (typedText[i] === char) correctChars++;
    });

    const timeInMinutes = variableTime / 60;

    const wpm = Math.round(correctChars / (5 * timeInMinutes));

    const rawAccuracy = typedText.length
      ? Math.round((correctChars / typedText.length) * 100)
      : 0;

    return { wpm, rawAccuracy, typedText };
  };
  
  useEffect(() => { // TIMER DECREMENT
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

  useEffect(() => { // CURSOR POSITION
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
    trigger: avgWpmPerSecondArr.length === variableTime,
    data: {
      ...calculateFinalResults(),
      wrongCharsTyped,
      totalCharsTyped,
      avgWpmPerSecondArr,
      burstPerSecondArr,
      rawWpmPerSecondArr,
      wrongCharsPerSecondArr,
    },
  });

  return (
    <div className="select-none ml-5 mt-25 text-4xl pt-[30px] pb-[30px] min-h-[35vh] h-fit w-[85%] font-mono text-gray leading-[50px] overflow-hidden">
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

      {lines
        .slice(visibleStartLine, visibleStartLine + 3)
        .map((line, lineIdx) => {
          const actualLineIndex = visibleStartLine + lineIdx;

          const charsBefore = lines
            .slice(0, actualLineIndex)
            .reduce((acc, l) => acc + l.length + 1, 0);

          return (
            <div key={actualLineIndex}>
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