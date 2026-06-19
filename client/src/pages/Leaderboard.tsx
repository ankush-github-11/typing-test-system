import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import { useTitle } from "../hooks/useTitle";
import LeaberboardTable from "../components/LeaberboardTable";

const Leaderboard = () => {
  const { isDark } = useTheme();
  useTitle("Leaderboard");
  
  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="bg-bgcolor text-textcolor font-poppins w-full min-h-screen"
    >
      <Navbar />
      <LeaberboardTable />
    </div>
  );
};

export default Leaderboard;
