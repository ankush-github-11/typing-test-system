import "../styles/cursor.css";
import { useTypingAreaFocusedStore } from "../store/useTypingAreaFocusedStore";

const Cursor = ({ top, left, cn }: { top: number; left: number; cn: string }) => {
  const focused = useTypingAreaFocusedStore((state) => state.focused);
  return (
    <>
      <div
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
        className={`${focused ? "" : "blur-md"} transition-all duration-150 ease-linear h-[45px] w-[2.5px] bg-color1 inline-block absolute ${cn}`}
      ></div>
    </>
  );
};

export default Cursor;
