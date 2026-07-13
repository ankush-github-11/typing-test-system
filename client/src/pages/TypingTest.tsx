import { useTheme } from "../context/useTheme";
import { useTitle } from "../hooks/useTitle";
import TypingTestNavbar from "../components/TypingTestNavbar";
import "../styles/typingTest.css";
import TypingArea from "../components/TypingArea";
// import MobileSettingsNavbar from '../components/MobileSettingsBar';
import SettingsBar from "../components/SettingsBar";
import { useTestStartedStore } from "../store/useTestStartedStore";
import useCursorVisibility from "../hooks/useCursorVisibility";
import { useSettingsStore } from "../store/useSettingsStore";
import { useTestRestartStore } from "../store/useTestRestartStore";
import { useQueryClient } from "@tanstack/react-query";
import { useTimeTyping } from "../hooks/useTimeTyping";
import { useTestTimeStore } from "../store/useTestTimeStore";
import { useTestTimeLeftStore } from "../store/useTestTimeLeftStore";
import { useMe } from "../hooks/useMe";
import { useTestTotalCharsTypedStore } from "../store/useTestTotalCharsTypedStore";
import { useTotalCharsTyped } from "../hooks/useTotalCharsTyped";

const TypingTest = () => {
  const queryClient = useQueryClient();
  const restartTest = () => {
    setTestStarted(false);

    queryClient.invalidateQueries({
      queryKey: ["tokens"],
    });

    restart();
  };
  const { isDark } = useTheme();
  const { data: user } = useMe();
  const { timeTyping } = useTimeTyping();
  const { totalCharsTyped } = useTotalCharsTyped();
  useTitle("Ether Typing Test");

  const started = useTestStartedStore((state) => state.testStarted);
  const cursorVisible = useCursorVisibility(started);
  const quickRestart = useSettingsStore((state) => state.quickRestart);
  const setTestStarted = useTestStartedStore((state) => state.setTestStarted);

  const restartKey = useTestRestartStore((state) => state.restartKey);
  const restart = useTestRestartStore((state) => state.restart);

  const testTime = useTestTimeStore((state) => state.testTime);
  const testTimeLeft = useTestTimeLeftStore((state) => state.testTimeLeft);

  const testTotalCharsTyped = useTestTotalCharsTypedStore((state) => state.testTotalCharsTyped);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && quickRestart === "esc") {
      e.preventDefault();
      if(user?.id && testTimeLeft !== testTime) {
        timeTyping({ id: user.id, time_typing: testTime - testTimeLeft });
        totalCharsTyped({ id: user.id, total_chars_typed: testTotalCharsTyped });
      }
      restartTest();
    }
    else if (e.key === "Tab" && quickRestart === "tab") {
      e.preventDefault();
      if(user?.id && testTimeLeft !== testTime) {
        timeTyping({ id: user.id, time_typing: testTime - testTimeLeft });
        totalCharsTyped({ id: user.id, total_chars_typed: testTotalCharsTyped });
      }
      restartTest();
    }
    else if (e.key === "Alt" && quickRestart === "alt") {
      e.preventDefault();
      if(user?.id && testTimeLeft !== testTime) {
        timeTyping({ id: user.id, time_typing: testTime - testTimeLeft });
        totalCharsTyped({ id: user.id, total_chars_typed: testTotalCharsTyped });
      }
      restartTest();
    }
  };
  return (
    <div
      onKeyDown={handleKeyDown}
      data-theme={isDark ? "dark" : ""}
      className={`font-poppins h-screen bg-bgcolor text-textcolor ${!cursorVisible ? "cursor-none" : "cursor-default"}`}
    >
      <TypingTestNavbar />
      <div className="flex items-center flex-col mt-7">
        {/* <MobileSettingsNavbar /> */}
        <SettingsBar />
        <TypingArea key={restartKey} />
      </div>
    </div>
  );
};

export default TypingTest;
