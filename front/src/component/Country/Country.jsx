import React from "react";
import './Countrystyle.css';

function Country({ name, flag, id, continent}){
  console.log('continent ', continent, ' id ', id)
  return (
    <div className="box">
      <div >
        <div className="image">
          <p className="name"><b>{name}</b> 
          <hr/>
          <p>ID: {id}</p>
          <p>Continente: {continent}</p>
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