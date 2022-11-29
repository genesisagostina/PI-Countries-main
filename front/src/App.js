import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './component/Home/Home';
import LandingPage from './component/LandingPage/Landing';
import { CreateActivity } from './component/CreateActivity/createActivity';
import CountryDetail from './component/details/details'; 
function App(){


  return (           

    <Router>
      <div className="App">
      <Routes>
          <Route exact path="/" element={ <LandingPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/activities" element={<CreateActivity/>} />
          <Route path="/countries/:id" element={<CountryDetail/>} />
          
      </Routes>
      </div>
    </Router>   

  );
}
export default App;


