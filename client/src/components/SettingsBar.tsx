import {
  BookA,
  Swords,
  Timer,
  WandSparkles,
  Wrench,
  // WandSparkles,
  //  SlidersHorizontal,
  // Wrench
} from "lucide-react";
import { useDifficultyTokenStore } from "../store/useDifficultyTokenStore";
import { useTestTimeStore } from "../store/useTestTimeStore";

const SettingsNavbar = () => {
  const setDifficulty = useDifficultyTokenStore((state) => state.setDifficulty);
  const difficulty = useDifficultyTokenStore((state) => state.difficulty);
  const setTestTime = useTestTimeStore((state) => state.setTestTime);
  const testTime = useTestTimeStore((state) => state.testTime);
  return (
    <div className="z-10 group absolute right-0 top-1/2 -translate-y-1/2 h-fit w-15 hover:w-70 overflow-hidden transition-all duration-400 ease-in-out border-2 border-color1/80 border-r-0 rounded-bl-[50px] rounded-tl-[50px] flex flex-col p-5 gap-y-2 bg-black/3 dark:bg-white/3 backdrop-blur-md">
      <div className="flex flex-row opacity-25 w-fit gap-x-3 cursor-pointer hover:opacity-60">
        <div className="h-[30px] text-[17px] w-[30px] rounded-lg flex justify-center items-center bg-lightgray font-medium">
          #
        </div>
        <div className="h-[30px] text-textcolorless flex justify-center items-center">
          Punctuation
        </div>
      </div>

      <div className="flex flex-row opacity-25 w-fit gap-x-3 cursor-pointer hover:opacity-60">
        <div className="h-[30px] text-[17px] w-[30px] rounded-lg flex justify-center items-center bg-lightgray font-medium">
          6
        </div>
        <div className="h-[30px] text-md flex justify-center items-center">
          Number
        </div>
      </div>

      <div>
        <div className="activeTypingSetting flex items-center w-fit gap-x-3">
          <Timer className="font-2xl h-[30px] p-[4.5px] pb-[7px] pt-[4px] text-[20px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless" />
          <div className="h-[30px] text-md flex justify-center items-center">
            Time
          </div>
        </div>

        <div className="flex h-fit w-fit gap-x-3">
          <div
            onClick={() => setTestTime(15)}
            className={`cursor-pointer h-[30px] text-[16px] w-fit py-1 px-2 rounded-lg flex justify-center items-center font-medium transition-colors text-textcolorless ${
              testTime === 15 ? "activeTypingSetting" : "hover:bg-lightgray"
            }`}
          >
            15
          </div>

          <div
            onClick={() => setTestTime(30)}
            className={`cursor-pointer h-[30px] text-[16px] w-fit py-1 px-2 rounded-lg flex justify-center items-center font-medium transition-colors text-textcolorless ${
              testTime === 30 ? "activeTypingSetting" : "hover:bg-lightgray"
            }`}
          >
            30
          </div>

          <div
            onClick={() => setTestTime(60)}
            className={`cursor-pointer h-[30px] text-[16px] w-fit py-1 px-2 rounded-lg flex justify-center items-center font-medium transition-colors text-textcolorless ${
              testTime === 60 ? "activeTypingSetting" : "hover:bg-lightgray"
            }`}
          >
            60
          </div>

          <div
            onClick={() => setTestTime(120)}
            className={`cursor-pointer h-[30px] text-[16px] w-fit py-1 px-2 rounded-lg flex justify-center items-center font-medium transition-colors text-textcolorless ${
              testTime === 120 ? "activeTypingSetting" : "hover:bg-lightgray"
            }`}
          >
            120
          </div>

          <Wrench className="cursor-pointer h-[30px] p-[6.5px] text-[20px] w-fit py-1 px-2 rounded-lg flex justify-center items-center hover:bg-lightgray text-textcolorless" />
        </div>
      </div>

      <div className="opacity-25">
        <div className="flex items-center w-fit gap-x-3">
          <BookA className="font-2xl h-[30px] p-[4.5px] pb-[7px] pt-[4px] text-[20px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless" />
          <div className="h-[30px] text-md flex justify-center items-center">
            Words
          </div>
        </div>

        <div className="flex h-fit w-fit gap-x-3">
          <div className="cursor-pointer h-[30px] text-[16px] w-[30px] rounded-lg flex justify-center items-center font-medium hover:bg-bg-lightgray">
            10
          </div>
          <div className="cursor-pointer h-[30px] text-[16px] w-[30px] rounded-lg flex justify-center items-center font-medium hover:bg-bg-lightgray">
            30
          </div>
          <div className="cursor-pointer h-[30px] text-[16px] w-[30px] rounded-lg flex justify-center items-center font-medium hover:bg-bg-lightgray">
            50
          </div>
          <div className="cursor-pointer h-[30px] text-[16px] w-[30px] rounded-lg flex justify-center items-center font-medium hover:bg-bg-lightgray">
            100
          </div>
          <Wrench className="cursor-pointer h-[30px] p-[6.5px] text-[20px] w-fit py-1 px-2 rounded-lg flex justify-center items-center hover:bg-lightgray text-textcolorless" />
        </div>
      </div>

      <div className="w-fit">
        <div className="activeTypingSetting flex items-center w-fit gap-x-3">
          <Swords className="font-2xl h-[30px] p-[4.5px] pb-[7px] pt-[4px] text-[20px] w-[30px] rounded-lg flex justify-center items-center bg-bgcolorless text-color1" />
          <div className="h-[30px] text-md flex justify-center items-center">
            Difficulty
          </div>
        </div>

        <div className="flex h-fit w-fit gap-x-3">
          <div
            onClick={() => setDifficulty("easy")}
            className={`cursor-pointer h-[30px] w-fit px-2 text-[16px] rounded-lg flex justify-center items-center font-medium transition-colors text-textcolorless ${
              difficulty === "easy"
                ? "activeTypingSetting"
                : "hover:bg-lightgray"
            }`}
          >
            Easy
          </div>

          <div
            onClick={() => setDifficulty("medium")}
            className={`cursor-pointer h-[30px] w-fit px-2 text-[16px] rounded-lg flex justify-center items-center font-medium transition-colors text-textcolorless ${
              difficulty === "medium"
                ? "activeTypingSetting"
                : "hover:bg-lightgray"
            }`}
          >
            Medium
          </div>

          <div
            onClick={() => setDifficulty("hard")}
            className={`cursor-pointer h-[30px] w-fit px-2 text-[16px] rounded-lg flex justify-center items-center font-medium transition-colors text-textcolorless ${
              difficulty === "hard"
                ? "activeTypingSetting"
                : "hover:bg-lightgray"
            }`}
          >
            Hard
          </div>
        </div>
      </div>

      <div className="flex flex-row opacity-25 w-fit gap-x-3 cursor-pointer hover:opacity-60">
        <WandSparkles className="font-2xl h-[30px] p-[4.5px] pb-[7px] pt-[4px] text-[20px] w-[30px] rounded-lg flex justify-center items-center bg-lightgray" />
        <div className="h-[30px] text-textcolorless flex justify-center items-center">
          Freestyle
        </div>
      </div>
    </div>
  );
};

export default SettingsNavbar;
