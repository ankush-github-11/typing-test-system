import Navbar from "../components/layout/Navbar"
import { useTheme } from '../context/useTheme';
import { useTitle } from "../hooks/useTitle";
const Settings = () => {
  const { isDark } = useTheme();
  useTitle("Settings");
  return (
      <div data-theme={isDark ? 'dark' : ''}>
          <Navbar />
          <div className="bg-bgcolor text-textcolor min-h-screen h-fit flex justify-center items-center">Settings</div>
      </div>
  )
}
export default Settings