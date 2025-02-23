import {useLocation, useNavigate} from "react-router-dom";
import {motion} from "motion/react"
import Defaults from "./Defaults.ts";
import {useEffect, useMemo, useState} from "react";
import ColorHelper from "./ColorHelper.ts";
import confetti from "canvas-confetti";
import { FaRedo } from "react-icons/fa";

function Scene3Game() {
    const location = useLocation();
    const navigate = useNavigate();

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
    const [gameCompleted, setGameCompleted] = useState(false);

    useEffect(() => {
        if (revealed.length === 10) {
            setGameCompleted(true);
            confetti({
                particleCount: 500,
                spread: 120,
                startVelocity: 60,
                scalar: 1.2,
                origin: { y: 0.5 },
                ticks: 500,
            });
        }
    }, [revealed]);

    const handleTileClick = (num: number) => {
        if (num === currentNumber) {
            setRevealed([...revealed, num]);
            setCurrentNumber(currentNumber + 1);
        } else {
            setWrongAttempts([...wrongAttempts, num]);
            setTimeout(() => setWrongAttempts(
                    []),
                500);
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
                    const reveleadColor = 'transparent';
                    const wrongColor = 'red';
                    const hiddenColor = ColorHelper.getDarkerColor(choosenColor, 0.6);

                    const tileColor = isRevealed
                        ? reveleadColor
                        : isWrong
                            ? wrongColor
                            : hiddenColor;

                    const shadowClass = isRevealed ? null : 'shadow-lg';

                    return (
                        <motion.div
                            key={num}
                            animate={{
                                backgroundColor: tileColor
                            }}
                            transition={{duration: 0.3}}
                            className={`w-50 h-50 flex items-center justify-center cursor-pointer rounded-lg transition-all ${shadowClass}`}
                            whileTap={{scale: 0.9}}
                            onClick={() => handleTileClick(num)}>

                            {isRevealed ? (
                                <div className="relative w-full h-full">
                                    <motion.img
                                        src={`/tiles/${num}.jpg`}
                                        alt={`Tile ${num}`}
                                        className="w-full h-full object-cover rounded-lg"
                                        initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-full text-white font-playful text-lg font-bold text-center bg-black bg-opacity-50 py-1 rounded-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", opacity: 1 }}>
                                        {num}
                                    </motion.span>
                                </div>
                            ) : (
                                <motion.span
                                    className="text-white text-8xl font-bold font-playful"
                                    initial={{ opacity: 1 }}
                                    animate={isWrong ? {
                                        x: [-5, 5, -5, 5, 0]
                                    } : {}}
                                    transition={{ duration: 0.3 }}>
                                    {num}
                                </motion.span>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {gameCompleted && (
                <motion.button
                    className="mt-6 p-6 bg-white cursor-pointer text-black rounded-full shadow-lg text-6xl font-bold flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9, rotate: -10 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate('/choose-color')}
                >
                    <FaRedo />
                </motion.button>
            )}

        </motion.div>
    );
}

const getRandomNumbers = () => {
    return Array.from({length: 10}, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);
}

export default Scene3Game;