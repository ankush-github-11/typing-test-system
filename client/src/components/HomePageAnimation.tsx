import { useTheme } from '../context/useTheme';
import { BgKeyboard } from './BgKeyboard';
import { Link } from 'react-router-dom';
import TypingTestButton from './TypingTestButton';
const HomePageAnimation = () => {
  const { isDark } = useTheme();
  return (
      <div data-theme={isDark ? 'dark' : ''} className='font-poppins min-h-screen h-fit text-textcolor bg-bgcolor flex items-center flex-col space-y-3 pt-35'>
        <div className='z-2 p-2 bg-[#fafafa9f] dark:bg-[#212121b0]'>
            <h1 className="h-fit text-center text-4xl font-bold text-transparent bg-clip-text bg-[linear-gradient(135deg,_var(--color-textcolor),_var(--color-gray))]">
                Own The Keys and Beat Your Best
            </h1>
        </div>
        <Link
            to={"/typingtest"}
            draggable="false"
            className="z-10"
        >
            <TypingTestButton />
        </Link>
        <BgKeyboard />
      </div>
  )
}
export default HomePageAnimation