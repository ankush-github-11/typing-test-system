import Navbar from '../components/layout/Navbar'
import { useTheme } from '../context/useTheme';
const Leaderboard = () => {
  const { isDark } = useTheme();
  return (
    <div data-theme={isDark ? 'dark' : ''}>
      <title>Leaderboard</title>
      <Navbar />
      <div className="bg-bgcolor text-textcolor min-h-screen h-fit flex justify-center items-center">Leaderboard</div>
    </div>
  )
}

export default Leaderboard
 