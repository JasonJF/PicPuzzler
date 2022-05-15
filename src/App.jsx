import { useEffect, useState } from "react";
import "./App.css";
import CopyrightFooter from "./components/CopyrightFooter";
import Gameboard from "./scripts/Gameboard";
import {
  resetBoard,
  getCurrentBoardState,
  initializeBoard,
} from "./scripts/gameLogic";

function App() {
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const updateScore = () => {
    setScore(score + 1);
  };
  const resetEverything = () => {
    resetBoard();
    setScore(0);
    setIsComplete(false);
  };

  const setCompleteToTrue = () => {
    setIsComplete(true);
  };

  const sprayConfetti = () => {
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 3000);
  };
  const newGame = () => {
    setScore(0);
    setIsComplete(false);
    initializeBoard();
  };
  return (
    <div className="App">
      <div className="container pageWrapper">
        {/* Navigation */}
        <nav className="navbar myNav center">
          <p>PicPuzzler</p>
        </nav>
        {/* Main Content */}
        <div className="scoreWrapper center">
          {isComplete ? `Number of moves: ${score}` : `Score: ${score}`}
        </div>
        <div className="mainContent">
          <Gameboard
            updateScore={updateScore}
            setCompleteToTrue={setCompleteToTrue}
            isComplete={isComplete}
            confetti={confetti}
            setConfetti={setConfetti}
          />
          <div className="gameButtons m-2">
            <button
              className="btn btn-lg btn-warning mx-2"
              onClick={isComplete ? newGame : resetEverything}
            >
              {isComplete ? "Replay" : "Reset"}
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
