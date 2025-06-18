import { useTheme } from '../../context/useTheme';
import { UserRound, Sun, Moon } from 'lucide-react';
import EtherTypeLogo from '../../assets/images/EtherTypeLogo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="font-poppins bg-bgcolor flex items-center px-6 py-4 font-medium text-color1 justify-between" data-theme={isDark ? 'dark' : ''}>
      <Link to={"/"} className="flex space-x-2">
        <img src={EtherTypeLogo} draggable="false" className="h-[30px] mt-1 select-none" alt="EtherType Logo" />
        <div className="font-bold text-2xl select-none">EtherType</div>
      </Link>

      <div className="px-20 py-1.5 flex items-center space-x-4 mt-1 rounded-full border-2 border-cyan-100 dark:border-cyan-950">
        {isDark ? (
          <Moon onClick={toggleTheme} className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-lightgray p-[8.5px] cursor-pointer h-8.5 w-8.5 rounded-md" />
        ) 
        : (
          <Sun onClick={toggleTheme} className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-lightgray p-[8.5px] cursor-pointer h-8.5 w-8.5 rounded-md" />
        )}
          <Link to={"/leaderboard"} className="nav-style">
            Leaderboard
          </Link>
          <Link to={"/about"} className="nav-style">
            About
          </Link>
          <Link to={"/features"} className="nav-style">
            Features
          </Link>
          <Link to={"/settings"} className="nav-style">
            Settings
          </Link>
      </div>

      <a href="#" className="flex items-center space-x-2 p-2 pr-3 bg-color1 dark:bg-color3 rounded-full hover:bg-color3 dark:hover:bg-color1">
        <UserRound className="text-white h-5" />
        <div className="text-white">Create Account</div>
      </a>
    </nav>
  );
};

export default Navbar;
