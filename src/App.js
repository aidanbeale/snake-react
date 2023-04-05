import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


import Menu from './components/Menu';
import Snake from './components/Snake';
import Food from './components/Food';
import Button from './components/Button';


const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

function App() {
  const dispatch = useDispatch()
  const selectGameState = state => state.gameState
  const gameState = useSelector(selectGameState)

  useEffect(() => {
    if (!gameState || gameState.route != "game") return;
    const interval = setInterval(() => {
      moveSnake();
    }, gameState.speed);
    return () => clearInterval(interval);
  }, [gameState.route, gameState.snakeDots]);

  function moveSnake() {
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];
      switch (gameState.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
      }
      dots.push(head);
      dots.shift();
      dispatch({ type: 'gameState/setSnakeDots', payload: dots })
  };

  function onRouteChange() {
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

  function onDown() {
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] + 2];
    dots.push(head);
    dots.shift();

    dispatch({ type: 'gameState/setDirection', payload: "DOWN" });
    dispatch({ type: 'gameState/setSnakeDots', payload: dots });
  };

  function onUp() {
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] - 2];
    dots.push(head);
    dots.shift();

    dispatch({ type: 'gameState/setDirection', payload: "UP" });
    dispatch({ type: 'gameState/setSnakeDots', payload: dots });
  };

  function onRight() {
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] + 2, head[1]];
    dots.push(head);
    dots.shift();

    dispatch({ type: 'gameState/setDirection', payload: "RIGHT" });
    dispatch({ type: 'gameState/setSnakeDots', payload: dots });
  };

  function onLeft() {
    let dots = [...gameState.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] - 2, head[1]];
    dots.push(head);
    dots.shift();

    dispatch({ type: 'gameState/setDirection', payload: "LEFT" });
    dispatch({ type: 'gameState/setSnakeDots', payload: dots });
  };

  return (
    <div>
      {gameState.route === "menu" ? (
          <div>
            <Menu onRouteChange={onRouteChange} />
          </div>
        ) : (
          <div onKeyDown={onKeyDown}>
            <div className="game-area">
              <Snake snakeDots={gameState.snakeDots} />
              <Food food={gameState.food} />
            </div>
            <Button
              onDown={onDown}
              onLeft={onLeft}
              onRight={onRight}
              onUp={onUp}
            />
          </div>
        )}
    </div>
  );
}

export default App;
