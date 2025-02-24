import {useLocation, useNavigate} from "react-router-dom";
import {motion} from "motion/react"
import Defaults from "../Defaults.ts";
import {useEffect, useMemo, useState} from "react";
import ColorHelper from "../helpers/ColorHelper.ts";
import confetti from "canvas-confetti";
import {FaRedo} from "react-icons/fa";
import tile1 from "./../assets/tiles/1.jpg";
import tile2 from "./../assets/tiles/2.jpg";
import tile3 from "./../assets/tiles/3.jpg";
import tile4 from "./../assets/tiles/4.jpg";
import tile5 from "./../assets/tiles/5.jpg";
import tile6 from "./../assets/tiles/6.jpg";
import tile7 from "./../assets/tiles/7.jpg";
import tile8 from "./../assets/tiles/8.jpg";
import tile9 from "./../assets/tiles/9.jpg";
import tile10 from "./../assets/tiles/10.jpg";
import CollectionsHelper from "../helpers/CollectionsHelper.ts";

const tilesArray = CollectionsHelper.shuffleArray([
    tile1,
    tile2,
    tile3,
    tile4,
    tile5,
    tile6,
    tile7,
    tile8,
    tile9,
    tile10
]);

const maxAttempts = 3;

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
    const [wrongAttemptsCount, setWrongAttemptsCount] = useState(0);
    const numbers = useMemo(() => getRandomNumbers(), []);
    const [gameCompleted, setGameCompleted] = useState(false);
    const isGameOver = wrongAttemptsCount >= maxAttempts;

    useEffect(() => {
        if (revealed.length === 10) {
            setGameCompleted(true);
            confetti({
                particleCount: 500,
                spread: 120,
                startVelocity: 60,
                scalar: 1.2,
                origin: {y: 0.5},
                ticks: 500,
            });
        }
    }, [revealed]);

    const handleTileClick = (num: number) => {

        if (isGameOver)
            return;

        if (num === currentNumber) {
            setRevealed([...revealed, num]);
            setCurrentNumber(currentNumber + 1);
        } else {
            setWrongAttemptsCount(prev => prev + 1);
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

            <div className="flex justify-center gap-2 mb-4">
                {[...Array(maxAttempts)].map((_, index) => (
                    <motion.div
                        key={index}
                        style={{
                            backgroundColor: index < wrongAttemptsCount
                                ? ColorHelper.getDarkerColor(choosenColor, 0.6)
                                : 'red'
                        }}
                        className={`w-8 h-8 rounded-full`}
                        initial={{scale: 1}}
                        animate={{scale: index < wrongAttemptsCount ? 0.8 : 1}}
                        transition={{duration: 0.3}}
                    />
                ))}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                            className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-50 lg:h-50 flex items-center justify-center cursor-pointer rounded-lg transition-all ${shadowClass}`}
                            whileTap={{scale: 0.9}}
                            onClick={() => handleTileClick(num)}>

                            {isRevealed ? (
                                <div className="relative w-full h-full">
                                    <motion.img
                                        src={tilesArray[num - 1]}
                                        alt={`Tile ${num}`}
                                        className="w-full h-full object-cover rounded-lg"
                                        initial={{opacity: 0, rotateY: 90}}
                                        animate={{opacity: 1, rotateY: 0}}
                                        transition={{duration: 0.5, ease: "easeOut"}}
                                    />
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-full text-white font-playful text-lg font-bold text-center bg-black bg-opacity-50 py-1 rounded-lg"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 0.5}}
                                        style={{backgroundColor: "rgba(0, 0, 0, 0.5)", opacity: 1}}>
                                        {num}
                                    </motion.span>
                                </div>
                            ) : (
                                <motion.span
                                    className="text-white text-5xl sm:text-6xl md:text-8xl font-bold font-playful"
                                    initial={{opacity: 1}}
                                    animate={isWrong ? {
                                        x: [-5, 5, -5, 5, 0]
                                    } : {}}
                                    transition={{duration: 0.3}}>
                                    {num}
                                </motion.span>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {gameCompleted && (
                <motion.button
                    className="mt-4 sm:p-2 md:p-4 lg:p-6 bg-white cursor-pointer text-black rounded-full shadow-lg lg:text-6xl md:text-4xl sm:text-2xl font-bold flex items-center justify-center"
                    initial={{opacity: 0, scale: 0.5, rotate: -90}}
                    animate={{opacity: 1, scale: 1, rotate: 0}}
                    whileHover={{scale: 1.1, rotate: 10}}
                    whileTap={{scale: 0.9, rotate: -10}}
                    transition={{duration: 0.5}}
                    onClick={() => navigate('/choose-color')}
                >
                    <FaRedo/>
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