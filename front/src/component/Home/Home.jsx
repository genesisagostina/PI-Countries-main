import React, { Fragment,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCountries,
  filterCountriesByRegion,
  filterCreated,
  getActivities,
  orderCountries,
  orderByPopulation,
} from "../../redux/acciones";
import Country from "../Country/Country";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../paginado/paginado";
import "./Homestyle.css";

export default function Home() {
  const dispatch = useDispatch();
  const todosLosPaises = useSelector((state) => state.allCountries);
  const todosLosPaisesConFiltro = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [order, setOrder] = useState("");

  console.log('Todos los paises ', todosLosPaisesConFiltro)

  //creo estados locales. 1º un estado con la pag actual y un stado que me setee esa pag- seteo en 1
  const [currentPage, setCurrentPage] = useState(1);
  //paises por pag, que setee los paises xpag
  // eslint-disable-next-line no-unused-vars
  const [countriesForPage, setCountriesForPage] = useState(9);
  //indice del ultimo pais /
  const indexOfLastCountries = currentPage * countriesForPage; //10
  //indice del 1º pais
  const indexOffirestCountries = indexOfLastCountries - countriesForPage; //
  //paises de la pag actual = corto el array de todos los paises con el slice
  let currentCountries = []
  if(todosLosPaisesConFiltro != undefined){    
    if(!Array.isArray(todosLosPaisesConFiltro)){
      currentCountries = todosLosPaises.slice(
        indexOffirestCountries,
        indexOfLastCountries
      );
    }else{
      currentCountries = todosLosPaisesConFiltro.slice(
        indexOffirestCountries,
        indexOfLastCountries
      );
    }    
  }  

  const paginado = (NumPag) => {
    setCurrentPage(NumPag);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);
  //funcion del boton "volver"
 
  function handleFilterRegion(e) {
    dispatch(filterCountriesByRegion(e.target.value));
  }
  ///////ordenamiento//////
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderCountries(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handleFilterActivities(e){
    dispatch(filterCreated(e.target.value));
};

  return (
    <div className="pag">
      <div className="Home">
        <Link to="/">
          <h1 className="app">Paises Henry!</h1>
        </Link>
        <SearchBar />
      
      </div>
      <Paginado
          countriesForPage={countriesForPage}
          todosLosPaises={todosLosPaisesConFiltro.length}
          paginado={paginado}
        />
      <div className="contenedor">
              <div className="filter">
          <p>
            {" "}
            Orden Alfabetico:<h/>
            <select onChange={(e) => handleSort(e)} className="botForm">
              <option value="asc">Acendente</option>
              <option value="des">Desendente</option>
            </select>
          </p>
        </div>
        <div className="filter">
           <p> Orden Poblacional: <h/>
          <select onChange={(e) => handleSortPopulation(e)}className="botForm" >
            <option value="population_asc"> Mayor Población</option>
            <option value="population_des">Menor Población </option>
          </select>
           </p>
        </div>
        <div className="filter">
          <p> Continente: <h/>
        
          <select onChange={(e) => handleFilterRegion(e)} className="botForm">
            <option value="region"> Seleccionar </option>
            <option value="South America"> America del Sur </option>
            <option value="North America"> America del Norte </option>
            <option value="Asia"> Asia </option>
            <option value="Europe"> Europa </option>
            <option value="Africa"> Africa </option>
            <option value="Oceania"> Oceania </option>
            <option value="Antarctic"> Antártica </option>
          </select>
          </p>
        </div>
        <div className="filter">
          <Link to="/activities">
            <button className="botForm"> Crear Actividad </button>
          </Link>
        </div>
      </div>
      <div className="grid">
        {currentCountries &&
          currentCountries.map((el) => {
            return (
              <Link to={`/countries/${el.id}`}>
                <Fragment>
                  <Country name={el.name} flag={el.flag} region={el.region} />
                </Fragment>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
