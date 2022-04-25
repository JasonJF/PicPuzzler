import { useEffect, useState } from "react";
import "./App.css";
import CopyrightFooter from "./components/CopyrightFooter";
import Gameboard from "./scripts/Gameboard";
import { resetBoard, getCurrentBoardState } from "./scripts/gameLogic";

function App() {
  const [score, setScore] = useState(0);
  const updateScore = (scoreValue) => {
    setScore(scoreValue);
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
          <div className="scoreWrapper center"> Score : 0</div>
          {/* <div className="gameSquare">
            <div id="tileContainer" className="tileContainer">
              {tiles.map((tile, index) => {
                return (
                  <canvas
                    key={index}
                    id={tile}
                    className="tile"
                    onClick={handleTileClick}
                  >
                    {tile}
                  </canvas>
                );
              })}
            </div>
          </div> */}
          <Gameboard updateScore={updateScore} />
          <div className="gameButtons m-2">
            <button
              className="btn btn-lg btn-warning mx-2"
              onClick={resetBoard}
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
