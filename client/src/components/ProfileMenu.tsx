import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useLogout } from "../hooks/useLogout";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // call hook at top level
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center space-x-2 p-2 lg:pr-3 bg-color1 dark:bg-color1 rounded-full hover:bg-color1 dark:hover:bg-color1 select-none"
      >
        <div className="hidden lg:flex text-white">
          <UserRound className="text-white h-5" />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl shadow-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 overflow-hidden z-50">
          
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <User size={18} />
            <span>Profile</span>
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 cursor-pointer px-4 py-3 hover:bg-red-100 dark:hover:bg-red-900/30 transition text-left text-red-500"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;