import { useEffect, useState } from "react";
import { useAutoRedirect } from "../../hooks/useAutoRedirect";
// import Cursor from "../ui/Cursor"

const TypingArea = () => {
  const [targetText] = useState(
    "A developer is someone who solves problems using logic and code while continuously learning and adapting to new technologies in order to build efficient and innovative solutions",
  );
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [started, setStarted] = useState(false);

  const calculateResults = () => {
    const wordsTyped = typedText.trim().split(/\s+/).filter(Boolean).length;
    const timeInMinutes = 10 / 60;
    const wpm = Math.round(wordsTyped / timeInMinutes);
    let correctChars = 0;
    targetText.split("").forEach((char, i) => {
      if (typedText[i] === char) correctChars++;
    });
    const accuracy = typedText.length
      ? Math.round((correctChars / typedText.length) * 100)
      : 0;
    return { wpm, accuracy, typedText };
  };
  useEffect(() => {
    if (!started || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started]);

  useAutoRedirect({
    path: "/results",
    delay: 0,
    trigger: timeLeft === 0,
    data: calculateResults(),
  });
  return (
    <div className="select-none ml-5 mt-25 text-4xl pt-[30px] pb-[30px] min-h-[35vh] h-fit w-[85%] font-mono text-gray">
      <div className="text-2xl mb-4">Time Left: {timeLeft}s</div>
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
        onChange={(e) => {
          if (!started) setStarted(true);
          setTypedText(e.target.value);
        }}
        autoFocus
      />
      {targetText.split("").map((char, i) => {
        const typedChar = typedText[i];
        let className = "text-gray-400";
        if (typedChar === undefined) className = "text-gray-400";
        else if (typedChar === char) className = "text-textcolorless";
        else className = "text-red-500";
        return (
          <span key={i} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
};
export default TypingArea;
