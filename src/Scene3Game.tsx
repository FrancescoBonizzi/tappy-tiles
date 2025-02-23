import {useLocation, useNavigate} from "react-router-dom";
import {motion} from "motion/react"
import Defaults from "./Defaults.ts";
import {useEffect, useMemo, useState} from "react";
import ColorHelper from "./ColorHelper.ts";
import confetti from "canvas-confetti";

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
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 },
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
                                <motion.img
                                    src={`/tiles/${num}.jpg`}
                                    alt={`Tile ${num}`}
                                    className="w-full h-full object-cover rounded-lg"
                                    initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
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
                    className="mt-6 px-6 py-3 bg-white text-black rounded-xl shadow-lg text-2xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate('/choose-color')}
                >
                    Ricomincia
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