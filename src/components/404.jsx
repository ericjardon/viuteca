import React from 'react';

export default function Error404() {
    
    return(
        <div style={{backgroundColor: "#ff4a5f", display:"flex", justifyContent:"center", alignItems:"center",width:"80%", margin:"12% auto", borderRadius: "20px"}}>
            <p style={{color: "white", fontSize: "50px", textShadow: "2px 2px black"}}><br/>Lo sentimos, la ruta: '{document.location.pathname}' que estas buscando no existe. 😢 <br/><br/></p>
        </div>
    )
}