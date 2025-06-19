import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
import Navbar from '../components/layout/Navbar';
const TypingTest = () => {
    useTitle("Ether Typing Test")
  const { isDark } = useTheme();
  return (
    <div data-theme={isDark ? 'dark' : ''} className='h-screen bg-bgcolor text-textcolor'>
        <Navbar />
        <div>Hello</div>
    </div>
  )
}

export default TypingTest