import React from "react";
import './Countrystyle.css';
 

function Country({ name, flag, region}){
  return (
    <div className="box">
      <div >
        <div className="image">
          <p className="name"><b>{name}</b> 
          <hr/>
          <p>Continente: {region}</p>
          </p>
         
          <div className="contein">
            
          <img src= {flag} alt= {name + "flag"} className="image" width="180px" height="100px"/>
            <button className="boton1">Más detalles</button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Country; 