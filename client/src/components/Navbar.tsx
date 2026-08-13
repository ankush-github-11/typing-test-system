import { useTheme } from "../context/useTheme";
import { UserRound, Sun, Moon } from "lucide-react";
// import EtherTypeLogo from "../assets/images/EtherTypeLogo.png";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { data: user } = useMe();

  return (
    <div className="flex items-center pt-5 px-[7vw]">
      <Link to={"/"} className="flex abosolute pl-0 h-fit w-fit">
        {/* <img
          src={EtherTypeLogo}
          draggable="false"
          className="h-[30px] mt-1 select-none"
          alt="EtherType Logo"
        /> */}
        <div className="font-bold text-3xl select-none text-color1">
          EtherType
        </div>
      </Link>
      <nav
        className="font-poppins bg-bgcolor flex ml-auto font-medium text-textcolorless justify-between"
      >
        <div className="hidden absolute left-1/2 -translate-x-1/2 lg:flex items-center space-x-6 mt-1 select-none">
          {isDark ? (
            <Moon
              onClick={toggleTheme}
              className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-lightgray p-[8.5px] cursor-pointer h-8.5 w-8.5 rounded-md"
            />
          ) : (
            <Sun
              onClick={toggleTheme}
              className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-lightgray p-[8.5px] cursor-pointer h-8.5 w-8.5 rounded-md"
            />
          )}
          <Link to={"/leaderboard"} className="nav-items-style group relative text-textcolorless/80 hover:text-color1">
            Leaderboard
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-color1 transition-all duration-200 group-hover:w-full" />
          </Link>
          {/*
          <Link to={"/about"} className="nav-items-style">
            About
          </Link>
           <Link to={"/features"} className="nav-items-style">
            Features
          </Link> */}
          <Link to={"/settings"} className="nav-items-style group relative text-textcolorless/80 hover:text-color1">
            Settings
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-color1 transition-all duration-200 group-hover:w-full" />
          </Link>
        </div>

        {user ? (
          <ProfileMenu />
        ) : (
          <Link
            to={"/signup"}
            className="h-fit flex items-center space-x-2 p-2 bg-color1 rounded-full select-none"
          >
            <UserRound className="ml-2 mr-1 text-white h-5" />
            <span className="mr-3 text-white">Sign up</span>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
