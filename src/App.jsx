import { useEffect, useState } from "react";
import "./App.css";
import CopyrightFooter from "./components/CopyrightFooter";
import Gameboard from "./scripts/Gameboard";
import { resetBoard, getCurrentBoardState } from "./scripts/gameLogic";

function App() {
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const updateScore = () => {
    setScore(score + 1);
  };
  const resetEverything = () => {
    resetBoard();
    setScore(0);
  };

  const setCompleteToTrue = () => {
    setIsComplete(true);
  };
  return (
    <div className="App">
      <div className="container pageWrapper">
        {/* Navigation */}
        <nav className="navbar myNav center">
          <p>PicPuzzler</p>
        </nav>
        {/* Main Content */}
        <div className="mainContent">
          <div className="scoreWrapper center">
            {isComplete ? "You Win!" : `Score: ${score}`}
          </div>
          <Gameboard updateScore={updateScore} isComplete={setCompleteToTrue} />
          <div className="gameButtons m-2">
            <button
              className="btn btn-lg btn-warning mx-2"
              onClick={resetEverything}
            >
              Reset
            </button>
            <button
              className="btn btn-lg btn-success mx-2"
              onClick={getCurrentBoardState}
            >
              Get Board
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="footer center">
          <CopyrightFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
