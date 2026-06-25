import Navbar from '../components/Navbar'
import { useTheme } from '../context/useTheme';
import useButtonNavigator from '../hooks/useButtonNavigator';
import { useTitle } from '../hooks/useTitle';
const About = () => {
  const { isDark } = useTheme();
  useTitle("About");
  useButtonNavigator({ targetKey: "Escape", targetPath: "/typingtest" });
  return (
    <div data-theme={isDark ? 'dark' : ''} className="font-poppins bg-bgcolor text-textcolor">
      <Navbar />
      <div className="min-h-screen h-fit flex justify-center items-center">About</div>
    </div>
  )
}
export default About