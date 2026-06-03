import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
import Navbar from '../components/Navbar';
import "../styles/typingTest.css"
import TypingArea from '../components/TypingArea';
// import MobileSettingsNavbar from '../components/MobileSettingsBar';
import SettingsBar from '../components/SettingsBar';

const TypingTest = () => {
  useTitle("Ether Typing Test")
  const { isDark } = useTheme();

  return (
    <div data-theme={isDark ? 'dark' : ''} className="font-poppins h-screen bg-bgcolor text-textcolor">
      <Navbar />
      {/* Body Div */}
      <div className="flex items-center flex-col mt-7">
        {/* <MobileSettingsNavbar /> */}
        <SettingsBar />
        {/*  Typing Area  */}
        <TypingArea />
      </div>
    </div>
  );

}

export default TypingTest