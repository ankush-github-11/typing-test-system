import Navbar from '../components/Navbar'
import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
const Leaderboard = () => {
  const { isDark } = useTheme();
  useTitle("Leaderboard");
  return (
    <div data-theme={isDark ? 'dark' : ''} className="bg-bgcolor text-textcolor font-poppins">
      <Navbar />
      <div className="min-h-screen h-fit flex justify-center items-center">Leaderboard</div>
    </div>
  )
}

export default Leaderboard
 