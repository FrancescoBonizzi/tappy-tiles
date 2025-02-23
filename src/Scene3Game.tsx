import {useLocation} from "react-router-dom";
import {motion} from "motion/react"
import Defaults from "./Defaults.ts";

function Scene3Game() {
    const location = useLocation();

    // Estrai il colore dalla query string
    const params = new URLSearchParams(location.search);
    const colorParameter = params.get("color");
    const color = colorParameter
        ? `#${colorParameter}`
        : Defaults.backgroundColor;

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen text-white text-center"
            initial={{opacity: 0, backgroundColor: Defaults.backgroundColor}}
            animate={{opacity: 1, backgroundColor: color}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}>

        </motion.div>
    );
}

export default Scene3Game;