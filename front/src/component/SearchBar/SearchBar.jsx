import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getCountriesName} from '../../redux/acciones';
import './search.css';

export default function SearchBar(props){
    const dispatch = useDispatch();
    const [name , setName] = useState("")

function handleInputChange(e){
    setName(e.target.value)
    console.log(name)
}
function handleOnClick(e){
    console.log('OnClicksearchcountry')
    props.funcPaginado(1)
    dispatch(getCountriesName(name))
}

return(
    <div className="search">
        <input className="botForm"
        type = "text"
        placeholder="Buscador" 
        onChange={(e) => handleInputChange(e) }
        />
        <button onClick = {(e) => handleOnClick(e)}className="botForm">Buscar</button>
    </div>
)
}