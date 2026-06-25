import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
import TypingTestNavbar from '../components/TypingTestNavbar';
import "../styles/typingTest.css"
import TypingArea from '../components/TypingArea';
// import MobileSettingsNavbar from '../components/MobileSettingsBar';
import SettingsBar from '../components/SettingsBar';
import { useTestStartedStore } from '../store/useTestStartedStore';
import useCursorVisibility from '../hooks/useCursorVisibility';
import { useSettingsStore } from '../store/useSettingsStore';
import { useTestTimeStore } from '../store/useTestTimeStore';
import { useTestRestartStore } from "../store/useTestRestartStore";
import { useQueryClient } from "@tanstack/react-query";


const TypingTest = () => {
  const queryClient = useQueryClient();
  const restartTest = () => {
  setTestStarted(false);

  queryClient.invalidateQueries({
    queryKey: ["tokens"],
  });

  restart();
};
  useTitle("Ether Typing Test")
  const { isDark } = useTheme();
  const started = useTestStartedStore((state) => state.testStarted);
  const cursorVisible = useCursorVisibility(started);
  const quickRestart = useSettingsStore((state) => state.quickRestart);
  const setTestStarted = useTestStartedStore((state) => state.setTestStarted);
  const setTestTime = useTestTimeStore((state) => state.setTestTime);
  
  const restartKey = useTestRestartStore((state) => state.restartKey);
  const restart = useTestRestartStore((state) => state.restart);

  const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Escape" && quickRestart === "esc") {
    e.preventDefault();
    restartTest();
  }
  
  else if (e.key === "Tab" && quickRestart === "tab") {
    e.preventDefault();
    restartTest();
  }
  
  else if (e.key === "Alt" && quickRestart === "alt") {
    e.preventDefault();
    restartTest();
  }
};
  return (
    <div onKeyDown={handleKeyDown} data-theme={isDark ? 'dark' : ''} className={`font-poppins h-screen bg-bgcolor text-textcolor ${ !cursorVisible ? "cursor-none" : "cursor-default" }`}>
      <TypingTestNavbar />
      <div className="flex items-center flex-col mt-7">
        {/* <MobileSettingsNavbar /> */}
        <SettingsBar />
        <TypingArea key={restartKey} />
      </div>
    </div>
  );

}

export default TypingTest