import { useTheme } from '../context/useTheme';
import { useTitle } from '../hooks/useTitle';
import { Timer, WandSparkles, SlidersHorizontal, Wrench } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import "../styles/TypingTest.css"
const TypingTest = () => {
  useTitle("Ether Typing Test")
  const { isDark } = useTheme();
  return (
    <div data-theme={isDark ? 'dark' : ''} className="font-poppins h-screen bg-bgcolor text-textcolor">
      <Navbar />

      {/* Body Div */}
      <div className="flex justify-center mt-4">
        
        <div className="hidden md:flex items-center h-[40px] gap-4 lg:min-w-[900px] lg:w-fit md:w-[750px] px-2 rounded-md border border-bordercolor text-textcolorless">
          
          <div className="typing-settings-nav-element">
            <div className='h-full text-[17px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless font-medium'>#</div>
            <div className='h-full text-sm flex justify-center items-center'>Punctuation</div>
          </div>

          <div className="typing-settings-nav-element">
            <div className='h-full text-[17px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless font-medium'>6</div>
            <div className='h-full text-sm flex justify-center items-center'>Number</div>
          </div>

          <div className='h-full w-[1px] bg-bordercolor'></div>

          <div className="activeTypingSetting typing-settings-nav-element">
              <Timer className='font-2xl h-full p-[4.5px] pb-[7px] pt-[4px] text-[20px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless' />
            <div className='h-full text-sm flex justify-center items-center'>Time</div>
          </div>

          <div className="typing-settings-nav-element">
            <div className='h-full text-[17px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless font-medium'>A</div>
            <div className='h-full text-sm flex justify-center items-center'>Word</div>
          </div>

          <div className="typing-settings-nav-element">
              <WandSparkles className='h-full p-[6.5px] text-[20px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless' />
            <div className='h-full text-sm flex justify-center items-center'>Freestyle</div>
          </div>

          <div className="typing-settings-nav-element">
              <SlidersHorizontal className='h-full p-[6.5px] text-[20px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless' />
            <div className='h-full text-sm flex justify-center items-center'>Custom</div>
          </div>

          <div className='h-full w-[1px] bg-bordercolor'></div>

          <div className='flex h-full items-center justify-center'>
            <div className='activeTypingSetting cursor-pointer h-[85%] text-[13px] w-[30px] rounded-lg flex justify-center items-center hover:bg-bgcolorless'>15</div>
            <div className='cursor-pointer h-[85%] text-[13px] w-[30px] rounded-lg flex justify-center items-center hover:bg-bgcolorless'>30</div>
            <div className='cursor-pointer h-[85%] text-[13px] w-[30px] rounded-lg flex justify-center items-center hover:bg-bgcolorless'>60</div>
            <div className='cursor-pointer h-[85%] text-[13px] w-[30px] rounded-lg flex justify-center items-center hover:bg-bgcolorless'>120</div>
            <Wrench className='cursor-pointer ml-2.5 h-[85%] p-[6.5px] text-[20px] w-[30px] rounded-lg flex justify-center items-center hover:bg-bgcolorless' />
            
          </div>
        </div>
      </div>
    </div>
  );

}

export default TypingTest