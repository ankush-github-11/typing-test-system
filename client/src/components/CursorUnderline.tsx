import "../styles/cursor.css";
import { useTypingAreaFocusedStore } from "../store/useTypingAreaFocusedStore";
import { useTestStartedStore } from "../store/useTestStartedStore";
import { useSettingsStore } from "../store/useSettingsStore";

const CursorUnderline = ({ top, left, cn }: { top: number; left: number; cn: string }) => {
  const focused = useTypingAreaFocusedStore((state) => state.focused);
  const started = useTestStartedStore((state) => state.testStarted);
  const cursorSmoothness = useSettingsStore((state) => state.cursorSmoothness);
  let durationClass = "";
  if(cursorSmoothness === "off") durationClass = "duration-0";
  if(cursorSmoothness === "low") durationClass = "duration-90";
  if(cursorSmoothness === "medium") durationClass = "duration-140";
  if(cursorSmoothness === "high") durationClass = "duration-190";
  return (
    <>
      <div
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
        className={`${started || focused ? "" : "blur-md"} mt-[44px] transition-all ${durationClass} ease-linear h-[2.5px] w-[23px] bg-color1 inline-block absolute rounded-full ${cn}`}
      ></div>
    </>
  );
};

export default CursorUnderline;
