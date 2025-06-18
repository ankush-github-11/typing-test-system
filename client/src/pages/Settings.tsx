import Navbar from "../components/layout/Navbar"
import { useTheme } from '../context/useTheme';
const Settings = () => {
  const { isDark } = useTheme();
  return (
    <div data-theme={isDark ? 'dark' : ''}>
        <Navbar />
        <div className="bg-bgcolor text-textcolor min-h-screen h-fit flex justify-center items-center">Settings</div>
    </div>
  )
}
export default Settings