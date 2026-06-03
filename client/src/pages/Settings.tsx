import Navbar from "../components/Navbar"
import { useTheme } from '../context/useTheme';
import { useTitle } from "../hooks/useTitle";
const Settings = () => {
  const { isDark } = useTheme();
  useTitle("Settings");
  return (
      <div data-theme={isDark ? 'dark' : ''} className="font-poppins bg-bgcolor text-textcolor">
          <Navbar />
          <div className="min-h-screen h-fit flex justify-center items-center">Settings</div>
      </div>
  )
}
export default Settings