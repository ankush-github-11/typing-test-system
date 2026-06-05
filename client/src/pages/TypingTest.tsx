import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
import TypingTestNavbar from '../components/TypingTestNavbar';
import "../styles/typingTest.css"
import TypingArea from '../components/TypingArea';
// import MobileSettingsNavbar from '../components/MobileSettingsBar';
import SettingsBar from '../components/SettingsBar';
import { useTestStartedStore } from '../store/useTestStartedStore';
import useCursorVisibility from '../hooks/useCursorVisibility';

const TypingTest = () => {
  useTitle("Ether Typing Test")
  const { isDark } = useTheme();
  const started = useTestStartedStore((state) => state.testStarted);
  const cursorVisible = useCursorVisibility(started);
  return (
    <div data-theme={isDark ? 'dark' : ''} className={`font-poppins h-screen bg-bgcolor text-textcolor ${ !cursorVisible ? "cursor-none" : "cursor-default" }`}>
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