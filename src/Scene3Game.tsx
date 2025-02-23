import {useLocation} from "react-router-dom";
import {motion} from "motion/react"
import Defaults from "./Defaults.ts";
import {useMemo, useState} from "react";

function Scene3Game() {
    const location = useLocation();

    // Estrai il colore dalla query string
    const params = new URLSearchParams(location.search);
    const colorParameter = params.get("color");
    const color = colorParameter
        ? `#${colorParameter}`
        : Defaults.backgroundColor;

    const [currentNumber, setCurrentNumber] = useState(1);
    const [revealed, setRevealed] = useState<number[]>([]);
    const [wrongAttempts, setWrongAttempts] = useState<number[]>([]);
    const numbers = useMemo(() => getRandomNumbers(), []);

    const handleTileClick = (num: number) => {
        if (num === currentNumber) {
            setRevealed([...revealed, num]);
            setCurrentNumber(currentNumber + 1);
        } else {
            setWrongAttempts([...wrongAttempts, num]);
            setTimeout(() => setWrongAttempts(wrongAttempts.filter(n => n !== num)), 500);
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen text-white text-center"
            initial={{opacity: 0, backgroundColor: Defaults.backgroundColor}}
            animate={{opacity: 1, backgroundColor: color}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}>

            <div className="grid grid-cols-5 gap-4">
                {numbers.map((num) => (
                    <motion.div
                        key={num}
                        className={`w-50 h-50 flex items-center justify-center font-bold cursor-pointer rounded-lg shadow-lg transition-all 
                            ${revealed.includes(num) ? "bg-transparent" : "bg-gray-700"} 
                            ${wrongAttempts.includes(num) ? "bg-red-500" : ""}`}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTileClick(num)}
                    >
                        {revealed.includes(num) ? (
                            <img src={`/tiles/${num}.jpg`} alt={`Tile ${num}`} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <span className="text-white text-8xl">{num}</span>
                        )}
                    </motion.div>
                ))}
            </div>

        </motion.div>
    );
}

const getRandomNumbers = () => {
    return Array.from({ length: 10 }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);
}

export default Scene3Game;