import React from "react";
import "./GameOver.css";

import { useState, useEffect } from 'react';

const Menu = ({ score, startGame }) => {
  const [hiscores, setHiscores] = useState([]);

  useEffect(() => {
    if(!hiscores.length) {
      console.log("Fetching scores...");
      fetch(process.env.REACT_APP_HISCORES_API + "/items")
        .then((response) => response.json())
        .then((data) => {
          data.sort((s1, s2) => {
            return s2.score - s1.score;
        });
          setHiscores(data);
        })
        }
  }, [])

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
                return (
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