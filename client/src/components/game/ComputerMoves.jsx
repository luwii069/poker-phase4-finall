import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getToken from '../auth/getToken'

function ComputerMoves({props}) {
    const [move, setMove] = useState([])
    let token = getToken()
    function handleClick(){
    useEffect(function(){
        axios.get("http://127.0.0.1:5000/game/computer_moves",{
          headers:{
            "Authorization": `Bearer ${token}`
          }
           

  
        })
    }, [])
  }


  return (
    <div>
        <button onSubmit={handleClick} >ComputerMove</button>
    </div>
  )
}

export default ComputerMoves;