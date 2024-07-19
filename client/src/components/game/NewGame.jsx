import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import DealCards from './DealCards'
import getToken from '../auth/getToken'

function NewGame({player_hand, computer_hand}) {
    const [game, setGame] = useState([])
    const token = getToken()

    useEffect(function(){
    axios.post("http://127.0.0.1:5000/game/new_game", game,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    .then(function(res){
        setGame(res.data)
       
    })
  
    }, [token])  
    
  return (
    <div>
     
    <DealCards player_hand={player_hand} computer_hand={computer_hand} />


    </div>
  
  )
}

export default NewGame