import {motion} from "motion/react"
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Scene1StartingMenu() {
    const navigate = useNavigate();
    const [isFading, setIsFading] = useState(false);
    const fadeDurationMs = 1000;
    const animationDurationMs = isFading ? fadeDurationMs : 1500;
    const repeat = isFading ? 0 : Infinity;

    const handleClick = () => {
        setIsFading(true);
        setTimeout(() => navigate("/game"), fadeDurationMs);
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
            <motion.div
                className="flex flex-col items-center justify-center"
                animate={{scale: [1, 1.1, 1], opacity: isFading ? 0 : 1}}
                transition={{duration: animationDurationMs / 1000, ease: "easeInOut", repeat: repeat}}>

                <img src="/tappy-tiles-logo.png"
                     alt="TappyTiles Logo"
                     className="w-52 rounded-xl"
                />

                <p className="font-playful text-4xl mt-8">
                    Tocca per giocare!
                </p>

            </motion.div>
        </div>
    );
}

export default Scene1StartingMenu;
