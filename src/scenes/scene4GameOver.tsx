import {motion} from "motion/react"
import RestartButton from "../components/RestartButton.tsx";

function Scene4GameOver() {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}>

            <motion.p
                className="text-5xl font-bold mb-8"
                initial={{scale: 0.5}}
                animate={{scale: 1.2}}
                transition={{duration: 0.5, yoyo: Infinity}}>
                😢 Ops! Vuoi riprovare?
            </motion.p>

            <RestartButton/>
        </motion.div>
    );
}

export default Scene4GameOver;