import { motion } from "motion/react"

function App() {
   // const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
            <motion.img
                src="/tappy-tiles-logo.png"
                alt="TappyTiles Logo"
                className="w-52 cursor-pointer rounded-xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => console.log("Logo clicked")}
            />

            <p className="font-playful text-4xl opacity-80 transition-opacity duration-300 hover:opacity-100 mt-6">
                Tocca lo schermo per iniziare!
            </p>
        </div>
    );
}

export default App
