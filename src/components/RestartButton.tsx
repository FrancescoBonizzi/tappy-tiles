import {motion} from "motion/react";
import {FaRedo} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const RestartButton = () => {

    const navigate = useNavigate();

    return (
        <motion.button
            className="mt-4 sm:p-2 md:p-4 lg:p-6 bg-white cursor-pointer text-black rounded-full shadow-lg lg:text-6xl md:text-4xl sm:text-2xl font-bold flex items-center justify-center"
            initial={{scale: 0.5}}
            animate={{
                opacity: 1.5,
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
            }}
            transition={{duration: 1, repeat: Infinity, ease: "easeInOut"}} // Ciclo infinito
            onClick={() => navigate('/choose-color')}
        >
            <FaRedo/>
        </motion.button>
    );
}

export default RestartButton;