import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scene1StartingMenu from "./scenes/scene1StartingMenu.tsx";
import Scene2ColorSelector from "./scenes/scene2ColorSelector.tsx";
import Scene3Game from "./scenes/scene3Game.tsx";
import Scene4GameOver from "./scenes/scene4GameOver.tsx";
import Scene5Win from "./scenes/scene5Win.tsx";

function App() {

    const basename = import.meta.env.BASE_URL; // Imposta automaticamente il base URL in base al deploy

    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path="/" element={<Scene1StartingMenu />} />
                <Route path="/choose-color" element={<Scene2ColorSelector />} />
                <Route path="/game" element={<Scene3Game />} />
                <Route path={"/game-over"} element={<Scene4GameOver />} />
                <Route path={"/win"} element={<Scene5Win />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
