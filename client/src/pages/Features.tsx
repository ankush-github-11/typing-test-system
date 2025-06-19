import Navbar from '../components/layout/Navbar'
import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
const Features = () => {
  const { isDark } = useTheme();
  useTitle("Features");
  return (
    <div data-theme={isDark ? 'dark' : ''}>
      <Navbar />
      <div className="bg-bgcolor text-textcolor min-h-screen h-fit flex justify-center items-center">Features</div>
    </div>
  )
}
export default Features