import { useTheme } from '../context/useTheme';
import HomePageAnimation from "../components/HomePageAnimation"
import Navbar from "../components/Navbar"
import { useTitle } from '../hooks/useTitle';
const Home = () => {
  const { isDark } = useTheme();
  useTitle("EtherType");
  return (
      <div data-theme={isDark ? 'dark' : ''} className="font-poppins bg-bgcolor text-textcolor">
        <Navbar />
        <HomePageAnimation />
      </div>
  )
}

export default Home