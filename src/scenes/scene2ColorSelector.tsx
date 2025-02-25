import {motion} from "motion/react"
import {useNavigate} from "react-router-dom";
import Defaults from "../Defaults.ts";

const colors = [
    "#e57373",
    "#64b5f6",
    "#81c784",
    "#ffcc80",
    "#ba68c8",
    "#5c5c5c",
    "#4db6ac",
    "#b0c1c5",
    "#ff8a65"
];

function Scene2ColorSelector() {
    const navigate = useNavigate();

    const handleColorSelect = (color: string) => {
        const colorWithouthHash = color.replace("#", "");
        setTimeout(() => navigate(`/game?color=${colorWithouthHash}`), 500);
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen text-white text-center"
            style={{backgroundColor: Defaults.backgroundColor}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}>
            <h1 className="text-4xl font-playful mb-8">Scegli un colore!</h1>
            <div className="grid grid-cols-3 gap-4">
                {colors.map((color) => (
                    <motion.div
                        key={color}
                        className={`w-20 h-20 rounded-lg cursor-pointer shadow-lg transition-all}`}
                        style={{backgroundColor: color}}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        transition={{ease: "linear", duration: 0.2}}
                        onClick={() => handleColorSelect(color)}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default Scene2ColorSelector;