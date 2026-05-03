import Navbar from "../components/Navbar";
import ResultGraph from "../components/ResultGraph";
import { useTheme } from "../context/useTheme";
import useButtonNavigator from "../hooks/useButtonNavigator";
import { useTitle } from "../hooks/useTitle";
import { useLocation, useNavigate } from "react-router-dom";
import type { TypingResult } from "../types/typingResult";

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
      <div className="pt-7">
        <ResultGraph result={data} />
      </div>
    </div>
  );
};
export default Results;
