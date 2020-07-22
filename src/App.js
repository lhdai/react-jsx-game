
import React, { useState } from "react";


import ChoiceCard from './Components/ChoiceCard';
import './App.css';



export const CHOICES = {
  scissors: {
    name: "scissors",
    url: "http://www.pngmart.com/files/1/Scissors-PNG-Pic.png"
  },
  paper: {
    name: "paper",
    url: "http://pngimagesfree.com/Paper/Thumb/blank-note-paper-free-clipa.png"
  },
  rock: {
    name: "rock",
    url:
      "https://opengameart.org/sites/default/files/forum-attachments/very%20simple%20rock_0.png"
  }
};

export const getRandomChoice = () => {
  let choiceNames = Object.keys(CHOICES); // returns an array of the keys, so: ['scissors', 'paper', 'rock']
  let randomIndex = Math.floor(Math.random() * 3); // either 0, 1, or 2
  let choiceName = choiceNames[randomIndex];
  return CHOICES[choiceName]; //this will return : a single object {name: ..., url:...}
};

export const getRoundOutcome = (userChoice) => {
  const computerChoice = getRandomChoice().name; // get the name of above single object that randomly got from the getRandomChoice function
  let result;

  if (userChoice === "rock") {
    result = computerChoice === "scissors" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "paper") {
    result = computerChoice === "rock" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "scissors") {
    result = computerChoice === "paper" ? "Victory!" : "Defeat!";
  }

  if (userChoice === computerChoice) result = "Tie game!";
  return [result, computerChoice];
};



function App() {
  const [prompt, setGamePrompt] = useState("START"); // this will re-render when state change
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null); // ???


  const onPlayerChoose = (playerChoice) => { //this "playerChoice" will be rock or paper or scissors from the button onClick
    const [result, compChoice] = getRoundOutcome(playerChoice); //call the getRoundOutCome to get the result and computerChoice which had got random choice from randomChoice function

    const newUserChoice = CHOICES[playerChoice];
    const newComputerChoice = CHOICES[compChoice];

    setPlayerChoice(newUserChoice);
    setComputerChoice(newComputerChoice);

    if (result === "Victory!") {
      setPreviousWinner("You");
    } else if (result === "Defeat!") {
      setPreviousWinner("Computer");
    } else {
      setPreviousWinner("Tie");
    }

    setGamePrompt(result);
    setGameHistory(gameHistory);
    gameHistory.push(result);
  };

  const [gameHistory, setGameHistory] = useState([]);
  

  return (
    <div className="App">
      <div className="App">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-8 themed-grid-col">
              <ChoiceCard
                title="Computer"
                imgURL={computerChoice && computerChoice.url}
                previousWinner={previousWinner}
              />
              <h1>{prompt}</h1>
              <div className="container">
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => onPlayerChoose("rock")}
                >
                  Rock
                  </button>
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => onPlayerChoose("paper")}
                >
                  Paper
                  </button>
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => onPlayerChoose("scissors")}
                >
                  Scissors
                  </button>
              </div>

              <ChoiceCard
                title="You"
                imgURL={playerChoice && playerChoice.url} // Guard syntax here --> if your playchoice.url hasnt had any info yet, the guard "playChoice &&" will ensure that the function can work if it actually has info inside.
                previousWinner={previousWinner}
              />
            </div>

            <div className="col-md-4 themed-grid-col">
              <h3>History</h3>
              <ul>
                {gameHistory.map(result => {
                  return <li>{result}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;