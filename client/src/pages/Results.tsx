import Navbar from "../components/Navbar";
import ResultGraph from "../components/ResultGraph";
import { useTheme } from "../context/useTheme";
import useButtonNavigator from "../hooks/useButtonNavigator";
import { useTitle } from "../hooks/useTitle";
import { useLocation, useNavigate } from "react-router-dom";
type TypingResult = {
  wpm: number;
  rawAccuracy: number;
  typedText: string;
  wpmPerSecondArr: number[];
};

const Results = () => {
  const navigate = useNavigate();
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
      <ResultGraph result={data} />
    </div>
  );
};
export default Results;
