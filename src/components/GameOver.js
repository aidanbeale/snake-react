import React from "react";
import "./GameOver.css";

import { useState, useEffect } from 'react';

const Menu = ({ score, startGame }) => {
  const [hiscores, setHiscores] = useState([]);
  const [isNewHighscore, setIsNewHighscore] = useState(false);
  const [hiscoreSubmitted, setHighscoreSubmitted] = useState(false);
  const [newScoreName, setNewScoreName] = useState("");


  useEffect(() => {
    if(!hiscores.length) {
      console.log("Fetching scores...");
      fetch(process.env.REACT_APP_HISCORES_API + "/items")
        .then((response) => response.json())
        .then((data) => {
          // Sort highscores from highest to lowest
          data.sort((s1, s2) => {
            return s2.score - s1.score;
          });
          data = data.slice(0, 8);

          // Adds new score to Hiscores array if >= 8th place or greater than 0
          if (data.length === 8 && score > data[data.length-1].score || score > 0) {
            setIsNewHighscore(true);
            let index = data.findIndex(obj => obj.score < score);
            if (index === -1) {
              index = data.length;
            }
            data.splice(index, 0, {score_name: newScoreName, score: score, newHighscore: true});
          }

          setHiscores(data.slice(0, 8));
        })
        }
  }, [])

  function submitNewHiscore() {
    const newScore = {
      score_name: newScoreName,
      score
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newScore)
    };

    fetch(process.env.REACT_APP_HISCORES_API + "/items", requestOptions)
      .then(response => response.json())
      .then(data => {
        setHighscoreSubmitted(true);

        // Remove 'newHighscore' property
        let newHiscores = hiscores.map(item => {
          if (item.newHighscore) {
            return newScore;
          } else {
            return item;
          }
        });
        setHiscores(newHiscores);
      });

    setIsNewHighscore(false);
    setNewScoreName("");
  }

  return (
    <div className="wrapper">
      <div>
        <p className="game-over">GAME OVER</p>
        <p className="score game-over-score">Score: {score}</p>
        <p className="score hiscores-header">HISCORES</p>
        <div>
          <table>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
            {
              hiscores.map(item => {
                return item.newHighscore ? (
                  <tr className="new-hs">
                    <td className="new-hs-td">
                      <input maxLength={10} onInput={e => setNewScoreName(e.target.value)}></input>
                    </td>
                    <td>{item.score}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{item.score_name}</td>
                    <td>{item.score}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
      {isNewHighscore ? (
        <div>
          <input
          onClick={submitNewHiscore}
          className={"restart"}
          type="button"
          value={"submit hiscore"}
        />
        </div>
      ) : null}
      {hiscoreSubmitted ? (
        <div>
          <p>Score submitted!</p>
        </div>
      ) : null}
      <div>
        <input
          onClick={startGame}
          className={"restart"}
          type="button"
          value={"restart"}
        />
      </div>
    </div>
  );
};

export default Menu;