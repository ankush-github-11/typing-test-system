import { useTheme } from "../context/useTheme";
import { UserRound, Sun, Moon } from "lucide-react";
// import EtherTypeLogo from "../assets/images/EtherTypeLogo.png";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import ProfileMenu from "./ProfileMenu";
import { useTestStartedStore } from "../store/useTestStartedStore";

const TypingTestNavbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { data: user } = useMe();
  const started = useTestStartedStore((state) => state.testStarted);

  return (
    <div className="flex">
      <Link to={"/"} className={`flex abosolute pl-10 pt-5 space-x-2 w-fit ${started ? "pointer-events-none" : ""}`}>
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
        className={`font-poppins bg-bgcolor flex ml-auto px-6 py-4 font-medium text-textcolorless justify-between ${
          started ? "invisible" : ""
        }`}
      >
        <div className="hidden absolute left-1/2 -translate-x-1/2 lg:flex px-20 py-1.5 items-center space-x-4 mt-1 select-none">
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
          <Link to={"/leaderboard"} className="nav-items-style">
            Leaderboard
          </Link>
          <Link to={"/about"} className="nav-items-style">
            About
          </Link>
          <Link to={"/features"} className="nav-items-style">
            Features
          </Link>
          <Link to={"/settings"} className="nav-items-style">
            Settings
          </Link>
        </div>

        {user ? (
          <ProfileMenu />
        ) : (
          <Link
            to={"/signup"}
            className="flex items-center space-x-2 p-2 lg:pr-3 mt-3 mr-4 bg-color1 dark:bg-color1 rounded-full hover:bg-color1 dark:hover:bg-color1 select-none"
          >
            <div className="hidden lg:flex text-white">
              <UserRound className="text-white h-5" />
              Create Account
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default TypingTestNavbar;