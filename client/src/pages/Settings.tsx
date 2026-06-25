import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import { useTitle } from "../hooks/useTitle";
import { useSettingsStore } from "../store/useSettingsStore";
const Settings = () => {
  const { isDark } = useTheme();
  useTitle("Settings");

  const cursorTypes = ["default", "block", "underline"] as const;
  const cursorSmoothnessTypes = ["off", "low", "medium", "high"] as const;
  const quickRestartTypes = ["tab", "esc", "alt"] as const;
  const errorBehaviourTypes = ["free", "nobackspace", "terminate"] as const;
  const showLiveWpmTypes = ["off", "on"] as const;
  const showLiveAccuracyTypes = ["off", "on"] as const;
  const showLiveBurstTypes = ["off", "on"] as const;

  const cursorType = useSettingsStore((state) => state.cursorType);
  const setCursorType = useSettingsStore((state) => state.setCursorType);
  const quickRestart = useSettingsStore((state) => state.quickRestart);
  const errorBehaviour = useSettingsStore((state) => state.errorBehaviour);
  const showLiveWpm = useSettingsStore((state) => state.showLiveWpm);
  const showLiveAccuracy = useSettingsStore((state) => state.showLiveAccuracy);
  const showLiveBurst = useSettingsStore((state) => state.showLiveBurst);

  const cursorSmoothness = useSettingsStore((state) => state.cursorSmoothness);
  const setCursorSmoothness = useSettingsStore(
    (state) => state.setCursorSmoothness,
  );
  const setQuickRestart = useSettingsStore((state) => state.setQuickRestart);
  const setErrorBehaviour = useSettingsStore(
    (state) => state.setErrorBehaviour,
  );
  const setShowLiveWpm = useSettingsStore((state) => state.setShowLiveWpm);
  const setShowLiveAccuracy = useSettingsStore(
    (state) => state.setShowLiveAccuracy,
  );
  const setShowLiveBurst = useSettingsStore((state) => state.setShowLiveBurst);
  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="font-poppins bg-bgcolor text-textcolor min-h-screen"
    >
      <Navbar />
      <div className="py-10 px-20 flex flex-col gap-y-5 text-textcolorless">
        <div className="w-full h-fit text-[30px] font-semibold">Cursor</div>
        <div className="h-fit flex flex-col gap-y-3 px-5 mb-8">
          <div className="flex flex-row justify-between items-center gap-x-5">
            <div className="flex flex-col flex-[6.3]">
              <div className="text-2xl">Cursor Type</div>
              <div className="text-textcolorless/60">
                Select the cursor type of the typing test
              </div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[3.7]">
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
          <div className="flex flex-row justify-between items-center gap-x-5">
            <div className="flex flex-col flex-[6.3]">
              <div className="text-2xl">Cursor Smoothness</div>
              <div className="text-textcolorless/60">
                Select the smoothness of the cursor movement
              </div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[3.7]">
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
        <div className="w-full h-fit text-[30px] font-semibold">
          Test Settings
        </div>
        <div className="h-fit flex flex-col gap-y-3 px-5 mb-8">
          <div className="flex flex-row justify-between items-center gap-x-5">
            <div className="flex flex-col flex-[6.3]">
              <div className="text-2xl">Quick restart</div>
              <div className="text-textcolorless/60">
                Enable quick restart while test is running or after the test
                using your favourite key
              </div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[3.7]">
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
          <div className="flex flex-row justify-between items-center gap-x-5">
            <div className="flex flex-col flex-[6.3]">
              <div className="text-2xl">Error Behaviour</div>
              <div className="text-textcolorless/60">
                Select the behaviour when an error occurs. Free is default(you
                can change it or continue), Nobackspace means you cannot
                backspace after an error, Terminate means the test ends when an
                error occurs
              </div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[3.7]">
              {errorBehaviourTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setErrorBehaviour(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1 ${
                    errorBehaviour === type
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
        <div className="w-full h-fit text-[30px] font-semibold">
          Live Results
        </div>
        <div className="h-fit flex flex-col gap-y-3 px-5 mb-8">
          <div className="flex flex-row justify-between items-center gap-x-5">
            <div className="flex flex-col flex-[6.3]">
              <div className="text-2xl">Show Live WPM</div>
              <div className="text-textcolorless/60">
                Toggle the visibility of live words per minute
              </div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[3.7]">
              {showLiveWpmTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setShowLiveWpm(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1 ${
                    showLiveWpm === type
                      ? "bg-color1 text-white"
                      : "bg-gray/35 hover:bg-gray/70"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-x-5">
            <div className="flex flex-col flex-[6.3]">
              <div className="text-2xl">Show Live Accuracy</div>
              <div className="text-textcolorless/60">
                Toggle the visibility of live accuracy
              </div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[3.7]">
              {showLiveAccuracyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setShowLiveAccuracy(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1 ${
                    showLiveAccuracy === type
                      ? "bg-color1 text-white"
                      : "bg-gray/35 hover:bg-gray/70"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-x-5">
            <div className="flex flex-col flex-[6.3]">
              <div className="text-2xl">Show Live Burst</div>
              <div className="text-textcolorless/60">
                Toggle the visibility of live burst
              </div>
            </div>
            <div className="flex flex-row gap-x-5 flex-[3.7]">
              {showLiveBurstTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setShowLiveBurst(type)}
                  className={`px-4 py-2 rounded-lg capitalize cursor-pointer flex-1 ${
                    showLiveBurst === type
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
      </div>
    </div>
  );
};
export default Settings;
