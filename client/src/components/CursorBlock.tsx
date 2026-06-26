import "../styles/cursor.css";
import { useTypingAreaFocusedStore } from "../store/useTypingAreaFocusedStore";
import { useTestStartedStore } from "../store/useTestStartedStore";

const CursorBlock = ({ top, left, cn }: { top: number; left: number; cn: string }) => {
  const focused = useTypingAreaFocusedStore((state) => state.focused);
  const started = useTestStartedStore((state) => state.testStarted);
  return (
    <>
      <div
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
        className={`${started || focused ? "" : "blur-md"} transition-all duration-150 ease-linear mt-[1px] h-[45px] w-[23px] border-2 border-color1 inline-block absolute rounded-sm ${cn}`}
      ></div>
    </>
  );
};

export default CursorBlock;
