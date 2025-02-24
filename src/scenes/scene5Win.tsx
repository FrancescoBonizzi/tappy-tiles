import RestartButton from "../components/RestartButton.tsx";
import {motion} from "motion/react"
import ColorHelper from "../helpers/ColorHelper.ts";

function Scene5Win() {

    const choosenColor = ColorHelper.getColorFromPageParams();

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-90 text-white text-center"
            style={{
                backgroundColor: choosenColor
            }}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}>

            <motion.p
                className="text-6xl mb-8"
                initial={{scale: 0.7}}
                animate={{ scale: 1.2, rotate: [3, -3, 0] }}
                transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror"}}>
                <motion.p className="text-6xl mb-8 font-playful">
                    🥳 🎊  EVVIVA!  🏆 🎈
                </motion.p>
            </motion.p>

            <RestartButton/>
        </motion.div>
    );
}

export default Scene5Win;