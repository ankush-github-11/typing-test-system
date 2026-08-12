import { useTheme } from "../context/useTheme";
import { BgKeyboard } from "./BgKeyboard";
import { Link } from "react-router-dom";
import TypingTestButton from "./TypingTestButton";
const HomePageAnimation = () => {
  const { isDark } = useTheme();
  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="font-poppins min-h-screen h-fit text-textcolor bg-bgcolor flex items-center flex-col space-y-3 pt-35"
    >
      <div
        className="
            z-2 p-[6px] px-3 rounded-lg overflow-visible
          bg-bgcolor
            backdrop-blur-sm shadow-md
            [mask-image:linear-gradient(to_right,transparent,black_1%,black_99%,transparent),linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]
            [mask-composite:intersect]
        "
      >
        <h1
          className="
            h-fit text-center text-4xl font-bold
            text-transparent bg-clip-text
            bg-[linear-gradient(135deg,var(--color-textcolor),var(--color-gray))]
          "
        >
          Own The Keys and Beat Your Best
        </h1>
      </div>
      <Link to={"/typingtest"} draggable="false" className="z-10">
        <TypingTestButton />
      </Link>
      <BgKeyboard />
    </div>
  );
};
export default HomePageAnimation;
