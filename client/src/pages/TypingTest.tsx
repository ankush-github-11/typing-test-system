import { useEffect, useRef, useState } from "react";
import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
import TypingTestNavbar from '../components/TypingTestNavbar';
import "../styles/typingTest.css"
import TypingArea from '../components/TypingArea';
// import MobileSettingsNavbar from '../components/MobileSettingsBar';
import SettingsBar from '../components/SettingsBar';
import { useTestStartedStore } from '../store/useTestStartedStore';

const TypingTest = () => {
  useTitle("Ether Typing Test")
  const { isDark } = useTheme();
  const started = useTestStartedStore((state) => state.testStarted);
  const [showCursor, setShowCursor] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const handleMouseEnter = () => {
    if (!started) return;
    setShowCursor(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowCursor(false);
    }, 1000);
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    <div data-theme={isDark ? 'dark' : ''} onMouseMove={handleMouseEnter} className={`font-poppins h-screen bg-bgcolor text-textcolor ${started && !showCursor ? "cursor-none" : ""}`}>
      <TypingTestNavbar />
      <div className="flex items-center flex-col mt-7">
        {/* <MobileSettingsNavbar /> */}
        <SettingsBar />
        <TypingArea />
      </div>
    </div>
  );

}

export default TypingTest