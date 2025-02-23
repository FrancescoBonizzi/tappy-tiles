import {useLocation} from "react-router-dom";
import {motion} from "motion/react"
import Defaults from "./Defaults.ts";
import {useMemo, useState} from "react";
import ColorHelper from "./ColorHelper.ts";

function Scene3Game() {
    const location = useLocation();

    // Estrai il colore dalla query string
    const params = new URLSearchParams(location.search);
    const choosenColorParameter = params.get("color");
    const choosenColor = choosenColorParameter
        ? `#${choosenColorParameter}`
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
            animate={{opacity: 1, backgroundColor: choosenColor}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}>

            <div className="grid grid-cols-5 gap-4">
                {numbers.map((num) => {
                    const isRevealed = revealed.includes(num);
                    const isWrong = wrongAttempts.includes(num);

                    const tileColor = isRevealed
                        ? 'transparent'
                        : isWrong
                            ? 'bg-red-500'
                            : ColorHelper.getComplementaryColor(choosenColor);

                    return (
                        <motion.div
                            key={num}
                            className={'z-50 h-50 flex items-center justify-center cursor-pointer rounded-lg shadow-lg transition-all'}
                            style={{backgroundColor: tileColor}}
                            whileTap={{scale: 0.9}}
                            onClick={() => handleTileClick(num)}>

                            {revealed.includes(num) ? (
                                <img src={`/tiles/${num}.jpg`} alt={`Tile ${num}`}
                                     className="w-full h-full object-cover rounded-lg"/>
                            ) : (
                                <span className="text-white text-8xl font-bold font-playful">{num}</span>
                            )}
                        </motion.div>
                    )
                })}
            </div>

        </motion.div>
    );
}

const getRandomNumbers = () => {
    return Array.from({length: 10}, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);
}

export default Scene3Game;