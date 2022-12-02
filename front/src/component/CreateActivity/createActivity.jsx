import React, { useEffect, useState } from "react";
import { getCountries, postActivity } from "../../redux/acciones";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";

function validate(activities) {
  console.log('Estoy validando ', activities)
  let error = {}
  if (!activities.name) {
    error.name = 'Nombre es requerido'
  }else if(!/^[a-zA-Z. ]+$/.test(activities.name)){
    error.name = 'El nombre no puede contener simbolos y/o numeros'
  }
  if (!activities.difficulty.length) {
    error.difficulty = 'Seleccione la Dificultad'
  }
  if (activities.difficulty === "") {
    error.difficulty = 'Seleccione la Dificultad'
  }
  if (!activities.duration) {
    error.duration = 'Duracion es requerida'
  }
  else if(!/^[0-9. ]+$/.test(activities.duration)){
    error.duration = 'La duracion solo puede contener numeros'
  }
  if (!activities.season) {
    error.season = 'Seleccione la Temporada'
  }
  if (activities.season === "") {
    error.season = 'Seleccione la Temporada'
  }
  else if (!activities.countries) {
    error.countries = 'Seleccione un Pais'
  }
  return error
}
//-----------------------------------------------------------

export function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  
  const [activities, setActivities] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getCountries());
  },[dispatch]);

//---------------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault()
   setError(validate(error))
   if(Object.keys(error).length !== 0){
     alert("Debe llenar todos los campos")
   } else {
   dispatch(postActivity(activities))
    setActivities({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    })
      alert('La actividad fue agregada') 
      setError(
      validate({
      ...activities,
      [e.target.name] : e.target.value,
    })
    
    )
  }
}

  //creo una funcion que me vá a guardar lo que usuario le pase por los input
  function handleChange(e) {
    setActivities({
      ...activities,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...activities,
        [e.target.name]: e.target.value,
      })
    );
  }


//---------------------------------------------------------
  // const [country, setCountry] = useState([]);
  function handleDelete(id) {
    setActivities({
      ...activities,
      countries: activities.countries.filter((el) => el !== id),
    });
  }
//---------------------------------------------------------
  function handleSelect(e) {
    setActivities({
      ...activities,
      countries: [...activities.countries, e.target.value],
    });
  }

  return (
    <div className="head">
      <section>
        <div className="entorno">
        <form onSubmit={e => handleSubmit(e)}>
            <h2>Agregar actividad</h2>
            <div className="form" >
              <label htmlFor="name">Nombre: </label>
              <input
                className="botForm"
                onChange={(e) => handleChange(e)}
                value={activities.name}
                name="name"
                type="text"
                placeholder="Agregue el nombre..."
              ></input>
              {error.name && <p className="error">{error.name}</p>}
              {/* <br></br> */}
            </div>

            <div className="season">
              <label htmlFor="season">Temporada: </label>
              <select
                className="botForm"
                onChange={(e) => handleChange(e)}     
                key={activities.season}
                value={activities.season}
                id="season"
                // type="text"
                name="season"
                required="required"
              >
                <option value="">Seleccionar</option>
                <option value="Verano">Verano</option>
                <option value="Otoño">Otoño</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
              </select>
              {error.season && <p className="error">{error.season}</p>}
            </div>

            <div className="duration">
              <label>Duración: </label>
              <input
                className="botForm"
                onChange={(e) => handleChange(e)}
                value={activities.duration}
                id="duration"
                type="text"
                name="duration"
                placeholder="Tiempo en horas"
                required="required"
              ></input>
              <br></br>
              {error.duration && <p className="error">{error.duration}</p>}
            </div>

            <div>
              <label htmlFor="difficulty">Dificultad: </label>
              <select onChange={(e) => handleChange(e)} className="botForm" key={activities.difficulty} id="difficulty"
                type="text" name="difficulty" required="required" value={activities.difficulty}
              >
                <option value="">Seleccionar</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {error.difficulty && <p className="error">{error.difficulty}</p>}
            </div>

            <div className="Act_Coun">
              <label onChange={handleChange}>
                Asigne el País a la Actividad:{" "}
              </label>
              <select
                // className="botForm"
                onChange={(e) => handleSelect(e)}
                key={activities.countries}
                // value={activity.countries}
                id="countries"
                type="text"
                name="countries"
                placeholder="Agregue su actividad"
                required="required"
              >
                <option value="All">Seleccionar</option>

                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <br></br>
            </div>
            <div>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <button className="botForm">Home</button>
              </Link>
              <button onClick={handleSubmit} className="botForm">
                Agregar Actividad
              </button>
            </div>

            {activities.countries.map((el) => (
              // este map me vá a renderiza los paises seleccionados
              <div className="country">
                <p>{el}</p>
                <button onClick={() => handleDelete(el)}>x</button>
              </div>
            ))}
          </form>
        </div>
      </section>
    </div>
  );
}
