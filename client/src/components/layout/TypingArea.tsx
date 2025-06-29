import { useState } from "react"
import Cursor from "../ui/Cursor"
const TypingArea = () => {
    const [targetText] = useState("A developer is someone who solves problems using logic and code while continuously learning and adapting to new technologies in order to build efficient and innovative solutions");
    const [typedText, setTypedText] = useState("");
    return (
        <div className='select-none ml-5 mt-25 text-4xl pt-[30px] pb-[30px] min-h-[35vh] h-fit w-[85%] font-mono text-gray'>
            <input className="min-h-[35vh] w-[85%] absolute opacity-0 cursor-default" type="text" value={typedText} onChange={(e) => setTypedText(e.target.value)} autoFocus />
            {targetText.split("").map((char, i) => {
                const typedChar = typedText[i];
                let className = "text-gray-400";
                if (typedChar === undefined) className = "text-gray-400";
                else if (typedChar === char) className = "text-textcolorless";
                else className = "text-red-500";
                return (
                    <span key={i} className={className}>
                        {char}
                    </span>
                );
            })}
        </div>
    )
}
export default TypingArea