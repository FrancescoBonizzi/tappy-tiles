import {motion} from "motion/react";
import {FaRedo} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const RestartGame = () => {

    const navigate = useNavigate();

    return (
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
    );
}

export default RestartGame;