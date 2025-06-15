import EtherTypeLogo from '../../assets/images/EtherTypeLogo.png';
import { UserRound } from 'lucide-react';
const Navbar = () => {
  return (
    <nav className="bg-[#FAFAFA] flex items-center px-6 py-4 font-bold text-cyan-400 justify-between">
        <div className='flex space-x-2'>
            <img src={EtherTypeLogo} draggable="false" className='h-[30px] mt-1 select-none' alt="" />
            <div className="font-bold text-2xl select-none">EtherType</div>
        </div>
        <div className="px-20 py-3 flex space-x-6 mt-1 rounded-full bg-gray-100 border-1 border-gray-200">
            <a href="#" className="text-cyan-800 font-medium hover:text-cyan-600">Leaderboard</a>
            <a href="#" className="text-cyan-800 font-medium hover:text-cyan-600">About</a>
            <a href="#" className="text-cyan-800 font-medium hover:text-cyan-600">Features</a>
            <a href="#" className="text-cyan-800 font-medium hover:text-cyan-600">Settings</a>
        </div>
        <a href="#" className='flex items-center space-x-2 p-2 pr-3 bg-cyan-500 rounded-full'>
            <UserRound className="text-white h-5"/>
            <div className="text-white">Create Account</div>
        </a>
    </nav>
  );
};

export default Navbar;