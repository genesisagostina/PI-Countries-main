import React from 'react';
import {Link} from 'react-router-dom'; 
import '../LandingPage/LandingPage.css'

export default function LandingPage(){
    return (
        <div className='Landing'>
            <div className='saludo'>
            <h1>Bienvenidos!</h1>
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <button className='boton'>Ingresar</button>
            </Link></div>
      </div>      
    )
}