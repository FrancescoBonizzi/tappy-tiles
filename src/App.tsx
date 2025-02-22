import { motion } from "motion/react"

function App() {
   // const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
            <motion.img
                src="/tappy-tiles-logo.png"
                alt="TappyTiles Logo"
                className="w-52 cursor-pointer rounded-xl"
                initial={{ opacity: 1, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                whileTap={{ scale: 0.9, rotate: 0 }}
                onClick={() => console.log("Logo clicked")}
            />

            <motion.p
                className="font-playful text-4xl mt-6"
                initial={{ opacity: 0.8, y: 50 }}
                animate={{ opacity: 0.8, y: [0, -5, 0] }}
                transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
                whileTap={{ scale: 0.9, opacity: 1 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
            >
                Tocca lo schermo per giocare!
            </motion.p>

        </div>
    );
}

export default App
