import Navbar from "../components/layout/Navbar";
import { useTheme } from "../context/useTheme";
import useButtonNavigator from "../hooks/useButtonNavigator";
import { useTitle } from "../hooks/useTitle";
import { useLocation } from "react-router-dom";

type TypingResult = {
  wpm: number;
  accuracy: number;
  typedText: string;
};

const Results = () => {

  // Navigate back to typing test on esc
  useButtonNavigator({ targetKey: "Escape", targetPath: "/typingtest" });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // BACKSPACE
    if (e.key === "Backspace") {
      e.preventDefault();
      navigate("/");
    }
  };
  const { isDark } = useTheme();
  useTitle("Results");
  const { state } = useLocation();
  const data = state as TypingResult;
  if (!data) {
    navigate("/");
    return null;
  }
  return (
    <div
      onKeyDown={handleKeyDown}
      data-theme={isDark ? "dark" : ""}
      className="font-poppins h-screen bg-bgcolor text-textcolor"
    >
      <Navbar />
      <h1>Your Results</h1>
      <p>WPM: {data.wpm}</p>
      <p>Accuracy: {data.accuracy}%</p>
      <p>Typed Text: {data.typedText}</p>
    </div>
  );
};
export default Results;
