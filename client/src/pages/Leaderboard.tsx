import Navbar from '../components/layout/Navbar'
import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
const Leaderboard = () => {
  const { isDark } = useTheme();
  useTitle("Leaderboard");
  return (
    <div data-theme={isDark ? 'dark' : ''}>
      <Navbar />
      <div className="bg-bgcolor text-textcolor min-h-screen h-fit flex justify-center items-center">Leaderboard</div>
    </div>
  )
}

export default Leaderboard
 