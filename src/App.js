import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

function App() {
  return (
    <div>
            <nav className="navb">
        <h3 className="win">
    
            Airport Admin Portal
      
        </h3>

      </nav>
      <nav className="navb">
 
      <div className="link">
          <Link to={"/"} className="nav-link">
            Login
          </Link>
        </div>
        <div className="link">
          <Link to={"/flights"} className="nav-link">
            Flights
          </Link>
        </div>
      
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/flights"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/flights/:id" component={Tutorial} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
