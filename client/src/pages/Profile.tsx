import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import useButtonNavigator from "../hooks/useButtonNavigator";
import { useMe } from "../hooks/useMe";
import { useTitle } from "../hooks/useTitle";
import {
  LaptopMinimalCheck,
  Rocket,
  SquareUser,
  ClockArrowUp,
  MapPin,
  Building2,
  Pencil,
  Flag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserRoundPen } from "lucide-react";
import WpmBarChart from "../components/WpmBarChart";
import { useUserTests } from "../hooks/useUserTestsData";

const Profile = () => {
  const { isDark } = useTheme();
  useTitle("Profile");
  useButtonNavigator({ targetKey: "Escape", targetPath: "/typingtest" });
  const { data: user, isLoading } = useMe();
  const { data: tests } = useUserTests(user?.id);
  const navigate = useNavigate();
  if (!isLoading && !user) {
    navigate("/login");
    return null;
  }
  console.log(tests);
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();

    const suffix =
      day % 100 >= 11 && day % 100 <= 13
        ? "th"
        : ["th", "st", "nd", "rd"][day % 10] || "th";

    return `${day}${suffix} ${d.toLocaleString("default", {
      month: "long",
    })}, ${d.getFullYear()}`;
  };
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((unit) => unit.toString().padStart(2, "0"))
      .join(":");
  };
  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="font-poppins h-fit bg-bgcolor text-textcolor"
    >
      <Navbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex gap-x-5 min-h-screen h-fit px-30 pb-30">
          {/*Left Div*/}
          <div className="flex-[2.5] min-h-screen h-fit rounded-xl pt-5">
            <div className="h-fit w-fit flex gap-x-3 items-center">
              <SquareUser size={120} strokeWidth={1} />
              <div className="flex flex-col gap-y-1 w-full h-fit">
                <p className="text-[16px]">{user.name}</p>
                <p className="text-[14px] text-textcolorless">Blank Username</p>
                <p className="text-[14px]">
                  Rank <span>Blank Rank</span>
                </p>
              </div>
            </div>
            <div className="h-fit w-full flex items-center gap-x-3 mb-5">
              <p className="w-fit text-color1 font-semibold text-[16px]">
                {user.level}
              </p>
              <div className="w-full h-2 bg-lightgray rounded-full">
                <div className="w-[80%] h-2 bg-gray rounded-full"></div>
              </div>
              <p className="w-fit text-textcolorless">
                <span className="font-semibold">{user.xp}</span>/2300
              </p>
            </div>
            <div className="h-fit w-full mb-5">
              <p className="text-[15px]">{user.bio}</p>
            </div>
            <div className="h-fit w-full mb-1 flex gap-x-3 items-center">
              <p className="text-[16px] font-semibold text-textcolorless/50">
                Joined
              </p>
              <p className="text-[15px]">{formatDate(user.created_at)}</p>
            </div>
            {user.keyboard && (
              <div className="h-fit w-full mb-5 flex gap-x-3 items-center">
                <p className="text-[16px] font-semibold text-textcolorless/50">
                  Keyboard
                </p>
                <p className="text-[15px]">{user.keyboard}</p>
              </div>
            )}
            <div className="mb-5 w-full h-fit select-none">
              <Link
                to="/edit"
                className="rounded-md text-[16px] border-2 border-color1 h-10 w-full flex justify-center items-center gap-x-1"
              >
                <span className="text-color1 text-[15px]">Edit Profile</span>
                <UserRoundPen className="text-color1" size={15} />
              </Link>
            </div>
            <div className="h-fit w-full flex flex-col gap-y-[8px] mb-5">
              <p className="text-[17px] font-semibold mb-1">Overall Stats</p>
              <div className="w-fit flex items-center">
                <Rocket
                  size={18}
                  strokeWidth={2}
                  className="text-pink-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Test Started
                </p>
                <p className="text-[16px]">{user.test_started}</p>
              </div>
              <div className="w-fit flex items-center">
                <LaptopMinimalCheck
                  size={18}
                  strokeWidth={2}
                  className="text-emerald-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Test Completed
                </p>
                <p className="text-[16px]">{user.test_completed}</p>
              </div>
              <div className="w-fit flex items-center">
                <ClockArrowUp
                  size={18}
                  strokeWidth={2}
                  className="text-yellow-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Time Typing
                </p>
                <p className="text-[16px]">{formatTime(user.time_typing)}</p>
              </div>
              <div className="w-fit flex items-center">
                <Pencil
                  size={18}
                  strokeWidth={2}
                  className="text-blue-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Total Chars Typed
                </p>
                <p className="text-[16px]">{user.total_chars_typed}</p>
              </div>
              <div className="w-fit flex items-center">
                <Flag
                  size={18}
                  strokeWidth={2}
                  className="text-orange-500 mr-2"
                />
                <p className="text-[14.5px] text-textcolorless/70 mr-5">
                  Longest Streak
                </p>
                <p className="text-[16px]">{user.longest_streak}</p>
              </div>
            </div>
            {user.city && user.country && user.organization && (
              <div className="h-fit w-full flex flex-col gap-y-[8px]">
                <p className="text-[17px] font-semibold mb-1">Details</p>
                <div className="w-fit flex items-center">
                  <MapPin
                    size={18}
                    strokeWidth={2}
                    className="text-textcolorless/60 mr-2"
                  />
                  <p className="text-[14.5px] mr-5 text-textcolorless">
                    <span>{user.city}</span>
                    <span>, </span>
                    <span>{user.country}</span>
                  </p>
                </div>
                <div className="w-fit flex items-center">
                  <Building2
                    size={18}
                    strokeWidth={2}
                    className="text-textcolorless/60 mr-2"
                  />
                  <p className="text-[14.5px] mr-5 text-textcolorless">
                    {user.organization}
                  </p>
                </div>
              </div>
            )}
          </div>
          {/*Right Div*/}
          <div className="flex-[7.5] min-h-screen h-fit bg-bgcolorless rounded-xl p-5">
            <div>
              <WpmBarChart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
