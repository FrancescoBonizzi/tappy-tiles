import {motion} from "motion/react"
import RestartButton from "../components/RestartButton.tsx";

function Scene4GameOver() {
    return (
        <motion.div
            className="flex flex-col p-4 items-center h-screen w-screen justify-center bg-black bg-opacity-75 text-white"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}>

            <motion.p
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-playful text-center"
                initial={{scale: 0.5}}
                animate={{scale: 1.2}}
                transition={{duration: 0.5, yoyo: Infinity}}>

                Ops!<br/>😢 ❌ 💔<br/>Riproviamo?

            </motion.p>

            <RestartButton/>
        </motion.div>
    );
}

export default Scene4GameOver;