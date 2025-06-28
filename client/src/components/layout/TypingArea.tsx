import { useState } from "react"
import Cursor from "../ui/Cursor"
const TypingArea = () => {
    const [targetText] = useState("The quick brown fox jumps over the lazy dog");
    const [typedText, setTypedText] = useState("");
    return (
        <div className='select-none ml-5 mt-30 text-4xl min-h-[35vh] h-fit w-[85%] font-mono text-gray'>
            <input type="text" value={typedText} onChange={(e) => setTypedText(e.target.value)} className="absolute opacity-0" autoFocus />
            {targetText.split("").map((char, i) => {
                const typedChar = typedText[i];
                let className = "text-gray-400";
                if (typedChar === undefined) className = "text-gray-400";
                else if (typedChar === char) className = "text-green-500";
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