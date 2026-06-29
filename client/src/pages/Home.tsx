import { useTheme } from '../context/useTheme';
import HomePageAnimation from "../components/HomePageAnimation";
import Navbar from "../components/Navbar";
import { useTitle } from '../hooks/useTitle';
import { useTestStartedStore } from '../store/useTestStartedStore';
import useButtonNavigator from '../hooks/useButtonNavigator';
const Home = () => {
  const { isDark } = useTheme();
  useTitle("EtherType");
  useButtonNavigator({ targetKey: "Escape", targetPath: "/typingtest" });
  const setTestStarted = useTestStartedStore((state) => state.setTestStarted);
  setTestStarted(false);
  return (
      <div data-theme={isDark ? 'dark' : ''} className="font-poppins bg-bgcolor text-textcolor">
        <Navbar />
        <HomePageAnimation />
      </div>
  )
}

export default Home