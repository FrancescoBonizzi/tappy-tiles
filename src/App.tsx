import {motion} from "motion/react"

function App() {
    // const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => console.log("Logo clicked")}
            className="cursor-pointer flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center"
            initial={{scale: 0.8}}
            animate={{scale: [1, 1.1, 1]}}
            transition={{duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse"}}>

            <img src="/tappy-tiles-logo.png"
                 alt="TappyTiles Logo"
                 className="w-52 rounded-xl"
            />

            <p className="font-playful text-4xl mt-8">
                Tocca per giocare!
            </p>

        </motion.div>
    );
}

export default App;
