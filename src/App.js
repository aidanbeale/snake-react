import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


import Menu from './components/Menu';
import Snake from './components/Snake';
import Food from './components/Food';
import Score from './components/Score';
import GameOver from './components/GameOver';
import TileArea from './components/TileArea';

const getRandomFood = () => {
  let min = 1;
  let max = 19;
  let x = Math.floor((Math.random() * (max - min + 1) + min)) * 25;
  let y = Math.floor((Math.random() * (max - min + 1) + min)) * 25;
  return [x, y];
};

function App() {
  const dispatch = useDispatch()
  const selectGameState = state => state.gameState
  const gameState = useSelector(selectGameState)

  document.onkeydown = onKeyDown;

  useEffect(() => {
    if (!gameState || gameState.route != "game") return;
    const interval = setInterval(() => {
      moveSnake();
    }, gameState.speed);
    return () => clearInterval(interval);
  }, [gameState.route, gameState.snakeDots]);

  useEffect(() => {
    if (!gameState || gameState.route != "game") return;
    onSnakeOutOfBounds();
    onSnakeCollapsed();
    onSnakeEats();
  }, [gameState.snakeDots])

  function moveSnake() {
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];
      switch (gameState.direction) {
        case "RIGHT":
          head = [head[0] + 25, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 25, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 25];
          break;
        case "UP":
          head = [head[0], head[1] - 25];
          break;
      }
      dots.push(head);
      dots.shift();
      dispatch({ type: 'gameState/setSnakeDots', payload: dots })
  };

  function onSnakeEats() {
    let head = gameState.snakeDots[gameState.snakeDots.length - 1];
    let food = gameState.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      dispatch({ type: 'gameState/setFood', payload: getRandomFood() });
      dispatch({ type: 'gameState/setScore', payload: gameState.score + 1 });
      increaseSnake();
      increaseSpeed();
    }
  }

  function increaseSnake() {
    let newSnake = [...gameState.snakeDots];
    newSnake.unshift([]);
    dispatch({ type: 'gameState/setSnakeDots', payload: newSnake });
  }
  function increaseSpeed() {
    if (gameState.speed > 150) {
      dispatch({ type: 'gameState/setSpeed', payload: gameState.speed - 5 });
    } else {
      dispatch({ type: 'gameState/setSpeed', payload: gameState.speed - 2 });
    }
  }

  function startGame() {
    dispatch({ type: 'gameState/reset' });
    dispatch({ type: 'gameState/setRoute', payload: "game" });
  };

  function onKeyDown(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        onLeft();
        break;
      case 38:
        onUp();
        break;
      case 39:
        onRight();
        break;
      case 40:
        onDown();
        break;
    }
  };

  function onSnakeOutOfBounds() {
    let head = gameState.snakeDots[gameState.snakeDots.length - 1];
    if (gameState.route === "game") {
      if (head[0] >= 500 || head[1] >= 500 || head[0] < 0 || head[1] < 0) {
        gameOver();
      }
    }
  }

  function onSnakeCollapsed() {
    let snake = [...gameState.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        gameOver();
      }
    });
  }

  function gameOver() {
    dispatch({ type: 'gameState/setRoute', payload: "gameOver" });
  }

  function onDown() {
    if (gameState.direction == "DOWN") return; 
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] + 25];
    dots.push(head);
    dots.shift();

    dispatch({ type: 'gameState/setDirection', payload: "DOWN" });
    dispatch({ type: 'gameState/setSnakeDots', payload: dots });
  };

  function onUp() {
    if (gameState.direction == "UP") return; 
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] - 25];
    dots.push(head);
    dots.shift();

    dispatch({ type: 'gameState/setDirection', payload: "UP" });
    dispatch({ type: 'gameState/setSnakeDots', payload: dots });
  };

  function onRight() {
    if (gameState.direction == "RIGHT") return; 
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] + 25, head[1]];
    dots.push(head);
    dots.shift();

    dispatch({ type: 'gameState/setDirection', payload: "RIGHT" });
    dispatch({ type: 'gameState/setSnakeDots', payload: dots });
  };

  function onLeft() {
    if (gameState.direction == "LEFT") return; 
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] - 25, head[1]];
    dots.push(head);
    dots.shift();

    dispatch({ type: 'gameState/setDirection', payload: "LEFT" });
    dispatch({ type: 'gameState/setSnakeDots', payload: dots });
  };

  return (
    <div>
      {gameState.route === "gameOver" ? (
        <GameOver score={gameState.score} startGame={startGame} />
      ) : ""}
      {gameState.route === "menu" ? (
          <div>
            <Menu startGame={startGame} />
          </div>
        ) : ""}
      {gameState.route === "game" ? (
          <div>
            <Score score={gameState.score} />
            <div className="game-area">
              <Snake snakeDots={gameState.snakeDots} />
              <Food food={gameState.food} />
              <TileArea columns={20} rows={20}/>
            </div>
          </div>
        ) : ""}
    </div>
  );
}

export default App;
