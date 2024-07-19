import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getToken from '../auth/getToken';
import Poker from 'poker-images';


function DealCards() {
  const token = getToken(); 
  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);
  const [tableCards, setTableCards] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/game/deal_cards", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      const { player_hand, computer_hand, table_card } = res.data; 
      setPlayerHand(player_hand);
      setComputerHand(computer_hand);
      setTableCards(table_card);
    })
    .catch(err => {
      console.log("Error", err.message);
    });
  }, []);

  function getCardImageUrl(rank, suit){
    const cardImage = Poker.getCardImage(90, suit, rank);
    return cardImage.src;

  }
  
    function handleClick(rank, suit){
      axios.post("http://127.0.0.1:5000/game/playermoves", {rank,suit},{
        headers:{
          "Authorization": `Bearer ${token}`
        }
    

      }).then(
        function(res){
          console.log(res.data);
          console.log(tableCards);
          if (res.data.valid) {
            setPlayerHand(prevPlayerHand =>
              prevPlayerHand.filter(card => !(card[0] === rank && card[1] === suit))
            );
          
            setTableCards(prevTableCards => 
              prevTableCards.concat([[rank, suit]])
            );
            const { computer_hand, table_card } = res.data.computer_moves;
              setComputerHand(computer_hand)
              setTableCards(table_card)
          }
          else{
            console.log("Invalid move");
        }
         
        if (res.data.penalty && res.data.penalty.length > 0) {
          setComputerHand(prevHand=>
            prevHand.concat(res.data.penalty)
            
          )
          }
       
        }
      )
      .catch(err =>{
        console.log("err", err.message);
      })

      
    }
  return (
    <div>
      <h3>Player's Hand</h3>
      <div>
        {playerHand.map((card, index) => (
          <img
            key={index}
            src={getCardImageUrl(card[0], card[1])}
            alt={`Card ${card.rank} of ${card.suit}`}
            style={{ width: '100px', height: '150px', margin: '10px' }}
            onClick={() =>handleClick(card[0], card[1])}
          />
        ))}
      </div>
      <div >
        <h3>Computer Hand</h3>
      {computerHand.map((card, index) => (
          <img
            key={index}
            src={getCardImageUrl(card[0], card[1])}
            alt={`Card ${card.rank} of ${card.suit}`}
            style={{ width: '100px', height: '150px', margin: '10px' }}
          
          />
        ))}
      </div>
      
      <h3>Table Cards</h3>
      <ul>
        {tableCards.map((card, index) => (
             <img
             key={index}
             src={getCardImageUrl(card[0], card[1])}
             alt={`Card ${card.rank} of ${card.suit}`}
             style={{ width: '100px', height: '150px', margin: '10px' }}
        
    
           />
        ))}
      </ul>
    </div>
  );
}
export default DealCards;