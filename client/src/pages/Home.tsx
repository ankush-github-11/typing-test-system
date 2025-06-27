import { useTheme } from '../context/useTheme';
import HomePageAnimation from "../components/layout/HomePageAnimation"
import Navbar from "../components/layout/Navbar"
import { useTitle } from '../hooks/useTitle';
const Home = () => {
  const { isDark } = useTheme();
  useTitle("EtherType");
  return (
      <div data-theme={isDark ? 'dark' : ''} className="font-poppins">
        <Navbar />
        <HomePageAnimation />
      </div>
  )
}

export default Home