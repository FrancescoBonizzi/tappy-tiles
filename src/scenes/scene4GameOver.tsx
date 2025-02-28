import {motion} from "motion/react"
import RestartButton from "../components/RestartButton.tsx";

function Scene4GameOver() {
    return (
        <motion.div
            className="select-none flex flex-col p-4 items-center h-screen w-screen justify-center bg-black bg-opacity-75 text-white"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}>

            <motion.p
                className="leading-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-playful text-center"
                animate={{y: [0, -10, 0]}}
                transition={{duration: 0.5, repeatType: "loop", ease: "linear", repeat: Infinity}}>

                Ops!<br/>😢 ❌ 💔<br/>Riproviamo?

            </motion.p>

            <RestartButton/>
        </motion.div>
    );
}

export default Scene4GameOver;