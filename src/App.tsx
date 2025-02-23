import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scene1StartingMenu from "./Scene1StartingMenu.tsx";
import Scene2ColorSelector from "./Scene2ColorSelector.tsx";
import Scene3Game from "./Scene3Game.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Scene1StartingMenu />} />
                <Route path="/choose-color" element={<Scene2ColorSelector />} />
                <Route path="/game" element={<Scene3Game />} />
            </Routes>
        </Router>
    );
}

export default App;
