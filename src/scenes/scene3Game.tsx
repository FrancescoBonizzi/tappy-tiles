import {useNavigate} from "react-router-dom";
import {motion} from "motion/react"
import Defaults from "../Defaults.ts";
import {useEffect, useMemo, useState} from "react";
import ColorHelper from "../helpers/ColorHelper.ts";
import confetti from "canvas-confetti";
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

const getTilesArray = () => {
    return CollectionsHelper.shuffleArray([
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
}

const maxAttempts = 3;
const errorColor = '#ff0059';

function Scene3Game() {
    const navigate = useNavigate();
    const choosenColor = ColorHelper.getColorFromPageParams();
    const choosenColorWithouthHash = choosenColor.replace("#", "");

    const [currentNumber, setCurrentNumber] = useState(1);
    const [revealed, setRevealed] = useState<number[]>([]);
    const [wrongAttempts, setWrongAttempts] = useState<number[]>([]);
    const [wrongAttemptsCount, setWrongAttemptsCount] = useState(0);
    const [isGameCompleted, setIsGameCompleted] = useState(false);
    const hasLost = wrongAttemptsCount >= maxAttempts;
    const tilesArray = useMemo(getTilesArray, []);
    const numbers = useMemo(() => getRandomNumbers(), []);

    if (hasLost) {
        navigate('/game-over');
        return null;
    }

    useEffect(() => {
        if (revealed.length === 10) {
            setIsGameCompleted(true);
            confetti({
                particleCount: 500,
                spread: 120,
                startVelocity: 60,
                scalar: 1.2,
                origin: {y: 0.5},
                ticks: 500,
            });
            setTimeout(() => {
                navigate(`/win?color=${choosenColorWithouthHash}`);
            }, 2000);
        }
    }, [revealed]);

    const handleTileClick = (num: number) => {

        if (hasLost || isGameCompleted)
            return;

        if (num === currentNumber) {
            setRevealed([...revealed, num]);
            setCurrentNumber(currentNumber + 1);
        } else {

            const isAlreadyRevelead = revealed.includes(num);
            if (isAlreadyRevelead)
                return;
            
            setWrongAttemptsCount(prev => prev + 1);
            setWrongAttempts([...wrongAttempts, num]);
            setTimeout(() => setWrongAttempts(
                    []),
                500);
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen text-white text-center"
            initial={{opacity: 0, backgroundColor: Defaults.backgroundColor}}
            animate={{opacity: 1, backgroundColor: choosenColor}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}>

            {!isGameCompleted &&
                <div className="flex justify-center gap-2 mb-4">
                    <LifesIndicator
                        wrongAttemptsCount={wrongAttemptsCount}
                        choosenColor={choosenColor}/>
                </div>
            }

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {numbers.map((num) => {
                    const isRevealed = revealed.includes(num);
                    const isWrong = wrongAttempts.includes(num);
                    const reveleadColor = 'transparent';
                    const hiddenColor = ColorHelper.getDarkerColor(choosenColor, 0.6);

                    const tileColor = isRevealed
                        ? reveleadColor
                        : isWrong
                            ? errorColor
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

                            {isRevealed
                                ? <ReveledTile num={num} tilesArray={tilesArray}/>
                                : <HiddenTile num={num} isWrong={isWrong}/>
                            }
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

const HiddenTile = ({num, isWrong}: { num: number, isWrong: boolean }) => {
    return (
        <motion.span
            className="text-white text-5xl sm:text-6xl md:text-8xl font-bold font-playful"
            initial={{opacity: 1}}
            animate={isWrong ? {
                x: [-5, 5, -5, 5, 0]
            } : {}}
            transition={{duration: 0.3}}>
            {num}
        </motion.span>
    );
}

const ReveledTile = ({num, tilesArray}: { num: number, tilesArray: string[] }) => {
    return (
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
    );
}

const LifesIndicator = ({wrongAttemptsCount, choosenColor}: { wrongAttemptsCount: number, choosenColor: string }) => {
    return (
        <div className="flex gap-4">
            {[...Array(maxAttempts)].map((_, index) => {

                    const isSafe = index >= wrongAttemptsCount;

                    return (
                        <motion.div
                            key={index}
                            style={{
                                backgroundColor: isSafe
                                    ? ColorHelper.getDarkerColor(choosenColor, 0.6)
                                    : errorColor,
                                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)'
                            }}
                            className="w-8 h-8 rounded-lg"
                            initial={{scale: 1}}
                            animate={{
                                scale: isSafe ? 1 : 1.2
                            }}
                            transition={{duration: 0.3}}
                        />
                    )
                }
            )}
        </div>
    );
}
export default Scene3Game;