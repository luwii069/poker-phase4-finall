import React from 'react'
import NewGame from '../game/NewGame';


function Dashboard( ) {
  const style ={
    color:"red",
  }
  function Logout(){
    localStorage.removeItem("token")
  
  }
  
  return (
    <div style={style}>
      <NewGame />
        <button className="logout" onClick={Logout}>Logout</button>
        
    </div>
  )
}

export default Dashboard