import "../styles/cursor.css";
import { useTypingAreaFocusedStore } from "../store/useTypingAreaFocusedStore";
import { useTestStartedStore } from "../store/useTestStartedStore";

const CursorUnderline = ({ top, left, cn }: { top: number; left: number; cn: string }) => {
  const focused = useTypingAreaFocusedStore((state) => state.focused);
  const started = useTestStartedStore((state) => state.testStarted);
  return (
    <>
      <div
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
        className={`${started || focused ? "" : "blur-md"} mt-[44px] transition-all duration-150 ease-linear h-[2.5px] w-[23px] bg-color1 inline-block absolute rounded-full ${cn}`}
      ></div>
    </>
  );
};

export default CursorUnderline;
