import { useTheme } from '../../context/useTheme';
import { UserRound, Sun, Moon } from 'lucide-react';
import EtherTypeLogo from '../../assets/images/EtherTypeLogo.png';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-bgcolor flex items-center px-6 py-4 font-bold text-color1 justify-between" data-theme={isDark ? 'dark' : ''}>
      <a href="#" className="flex space-x-2">
        <img src={EtherTypeLogo} draggable="false" className="h-[30px] mt-1 select-none" alt="EtherType Logo" />
        <div className="font-bold text-2xl select-none">EtherType</div>
      </a>

      <div className="px-20 py-1.5 flex items-center space-x-4 mt-1 rounded-full border-2 border-cyan-100 dark:border-cyan-950">
        {isDark ? (
          <Moon onClick={toggleTheme} className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-lightgray p-[8.5px] cursor-pointer h-8.5 w-8.5 rounded-md" />
        ) : (
          <Sun onClick={toggleTheme} className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-lightgray p-[8.5px] cursor-pointer h-8.5 w-8.5 rounded-md" />
        )}

        {/* Menu links */}
        {['Leaderboard', 'About', 'Features', 'Settings'].map((item) => (
          <a key={item} href="#" className="text-textcolorless font-medium rounded-md hover:bg-lightgray p-1.5 px-2 hover:text-cyan-900 dark:hover:text-cyan-50">
            {item}
          </a>
        ))}
      </div>

      <a href="#" className="flex items-center space-x-2 p-2 pr-3 bg-cyan-500 rounded-full">
        <UserRound className="text-white h-5" />
        <div className="text-white">Create Account</div>
      </a>
    </nav>
  );
};

export default Navbar;
