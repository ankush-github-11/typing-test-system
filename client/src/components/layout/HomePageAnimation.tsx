import { useTheme } from '../../context/useTheme';
import { BgKeyboard } from './BgKeyboard';
import { Link } from 'react-router-dom';
const HomePageAnimation = () => {
  const { isDark } = useTheme();
  return (
      <div data-theme={isDark ? 'dark' : ''} className=' font-poppins min-h-screen h-fit text-textcolor bg-bgcolor flex items-center flex-col space-y-3 pt-35'>
        <div className='z-2 p-2 bg-[#fafafa9f] dark:bg-[#212121b0]'>
            <h1 className=" h-fit text-center text-4xl font-bold text-transparent bg-clip-text bg-[linear-gradient(135deg,_var(--color-textcolor),_var(--color-gray))]">
                Own The Keys and Beat Your Best
            </h1>
        </div>
        <Link to={"/typingtest"} draggable="false" className="z-2 rounded-md p-1.5 pb-2 px-7 bg-color3 hover:bg-color1 text-white font-bold tracking-wider" >
            Typing Test
        </Link>
        <div className="select-none bg-[#fafafa9f] dark:bg-[#212121b0] px-4 flex relative top-[-100px] left-0 z-1 space-x-8 h-[430px] w-fit">
            <div className="relative overflow-hidden bg-gradient-to-b from-bgcolor to-gray h-[94%] w-[2.5px] bg-gray flex">
                <div className="sliding-animation bg-gradient-to-b from-gray dark:to-white relative top-[25px] left-0 bg-black dark:bg-white h-[60px] w-[2.5px] rounded-full"></div>
            </div>

            <div className="bg-gradient-to-b from-bgcolor to-gray h-[97%] w-[2.5px] bg-gray"></div>

            <div className="overflow-hidden bg-gradient-to-b from-bgcolor to-gray h-full w-[2.5px] bg-gray flex">
                <div className="sliding-animation bg-gradient-to-b from-gray dark:to-white relative top-[50px] left-0 bg-black dark:bg-white h-[60px] w-[2.5px] rounded-full"></div>
            </div>

            <div className="bg-gradient-to-b from-bgcolor to-gray h-[97%] w-[2.5px] bg-gray"></div>

            <div className="overflow-hidden bg-gradient-to-b from-bgcolor to-gray h-[94%] w-[2.5px] bg-gray flex">
                <div className="sliding-animation bg-gradient-to-b from-gray dark:to-white relative top-[75px] left-0 bg-black dark:bg-white h-[60px] w-[2.5px] rounded-full"></div>
            </div>

        </div>
        <BgKeyboard />
      </div>
  )
}
export default HomePageAnimation