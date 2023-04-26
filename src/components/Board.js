import React from "react";
import { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import CardData from "./CardData";
import "../styles/Board.css";

export default function Board() {
  const [cards, setCards] = useState(CardData);
  const [flipCount, setFlipCount] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);

  function shuffleCards(cards) {
    let i = cards.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
      i--;
    }
    return cards;
  }

  useMemo(() => {
    setCards(shuffleCards(cards));
  }, []);

  async function handleClick(id) {
    if (flipCount < 2) {
      setFlipCount(flipCount + 1);
      await flipCard(id);
      incrementMoves();
    } else {
      await checkMatch();
      flipBack();
      setFlipCount(0);
    }
  }

  function flipCard(id) {
    setCards((cards) => {
      return [
        ...cards.map((card) => {
          if (card.id === id) {
            return { ...card, isFlipped: true };
          } else {
            return card;
          }
        }),
      ];
    });
  }

  function incrementMoves() {
    setTotalMoves(totalMoves + 1);
  }

  function flipBack() {
    setCards((cards) => {
      return [
        ...cards.map((card) => {
          if (card.isFlipped === true && card.isMatched === false) {
            return { ...card, isFlipped: false };
          } else {
            return card;
          }
        }),
      ];
    });
  }

  function checkMatch() {
    const flippedCards = cards.filter(
      (card) => card.isFlipped === true && card.isMatched === false
    );
    if (flippedCards.length === 2) {
      if (flippedCards[0].name === flippedCards[1].name) {
        setCards((cards) => {
          return [
            ...cards.map((card) => {
              if (card.id === flippedCards[0].id) {
                return { ...card, isFlipped: true, isMatched: true };
              } else if (card.id === flippedCards[1].id) {
                return { ...card, isFlipped: true, isMatched: true };
              } else {
                return card;
              }
            }),
          ];
        });
        checkWin();
      }
    }
  }

  //check if all cards are matched and display win message
  function checkWin() {
    const matchedCards = cards.filter((card) => card.isMatched === true);
    console.log(matchedCards.length, cards.length);
    if (matchedCards.length === 8) {
      alert("You win in " + totalMoves + " moves");
    }
  }

  return (
    <div className="main">
      <h3>Memory Game</h3>
      <p>
        Click to flip and find the matching cards. <br />
        Try to find them all in the least amount of moves.
      </p>
      <div> Total moves: {totalMoves} </div>

      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            isMatched={card.isMatched}
            isFlipped={card.isFlipped}
            handleClick={handleClick}
            checkMatch={checkMatch}
            name={card.name}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
}
