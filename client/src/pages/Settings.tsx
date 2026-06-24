import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import { useTitle } from "../hooks/useTitle";
import { useSettingsStore } from "../store/useSettingsStore";
const Settings = () => {
  const { isDark } = useTheme();
  useTitle("Settings");
  
  const cursorTypes = ["default", "line", "block", "underline"] as const;
  const cursorSmoothnessTypes = ["low", "medium", "high"] as const;
  const quickRestartTypes = ["esc", "tab", "alt"] as const;

  const cursorType = useSettingsStore((state) => state.cursorType);
  const setCursorType = useSettingsStore((state) => state.setCursorType);
  const quickRestart = useSettingsStore((state) => state.quickRestart);

  const cursorSmoothness = useSettingsStore((state) => state.cursorSmoothness);
  const setCursorSmoothness = useSettingsStore((state) => state.setCursorSmoothness);
  const setQuickRestart = useSettingsStore((state) => state.setQuickRestart);
  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="font-poppins bg-bgcolor text-textcolor min-h-screen"
    >
      <Navbar />
      <div className="py-10 px-20 flex flex-col gap-y-5 text-textcolorless">
        <div className="w-full h-fit text-[30px] font-semibold">Cursor</div>
        <div className="h-fit flex flex-col gap-y-3 px-5 mb-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col flex-[6]">
              <div className="text-2xl">Cursor Type</div>
              <div>Select the cursor type of the typing test</div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[4]">
              {cursorTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setCursorType(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1  ${
                    cursorType === type
                      ? "bg-color1 text-white"
                      : "bg-gray/35 hover:bg-gray/70"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col flex-[6]">
              <div className="text-2xl">Cursor Smoothness</div>
              <div>Select the smoothness of the cursor movement</div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[4]">
              {cursorSmoothnessTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setCursorSmoothness(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1 ${
                    cursorSmoothness === type
                      ? "bg-color1 text-white"
                      : "bg-gray/35 hover:bg-gray/70"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-fit text-[30px] font-semibold">Test Settings</div>
        <div className="h-fit flex flex-col gap-y-3 px-5 mb-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col flex-[6]">
              <div className="text-2xl">Quick restart</div>
              <div>Enable quick restart after/while test using your favourite key</div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[4]">
              {quickRestartTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setQuickRestart(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1 ${
                    quickRestart === type
                      ? "bg-color1 text-white"
                      : "bg-gray/35 hover:bg-gray/70"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col flex-[6]">
              <div className="text-2xl">Cursor Smoothness</div>
              <div>Select the smoothness of the cursor movement</div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[4]">
              {cursorSmoothnessTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setCursorSmoothness(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1 ${
                    cursorSmoothness === type
                      ? "bg-color1 text-white"
                      : "bg-gray/35 hover:bg-gray/70"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col flex-[6]">
              <div className="text-2xl">Cursor Smoothness</div>
              <div>Select the smoothness of the cursor movement</div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[4]">
              {cursorSmoothnessTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setCursorSmoothness(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1 ${
                    cursorSmoothness === type
                      ? "bg-color1 text-white"
                      : "bg-gray/35 hover:bg-gray/70"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-fit text-[30px] font-semibold">Live Results</div>
        <div className="h-fit"></div>
      </div>
    </div>
  );
};
export default Settings;
