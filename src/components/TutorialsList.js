import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";

const FlightsList = () => {
  const [flights, setFlights] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveFlights();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveFlights = () => {
    TutorialDataService.getAll()
      .then(response => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveFlights();
    setCurrentFlight(null);
    setCurrentIndex(-1);
  };

  const setActiveFlight = (flight, index) => {
    setCurrentFlight(flight);
    setCurrentIndex(index);
  };

  const removeAllFlights = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };



  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  return (
    <div className="cont2">
      
      
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by flight number"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
  
      <div className="col-md-6">
        <h4>All Flights (click to update):</h4>
        <br></br>

        <ul className="list-group">
          {flights &&
            flights.map((flight, index) => (
              <Link id="f" to={"/flights/" + flight.id}><li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFlight(flight, index)}
                key={index}
              >
                <span id="sp">{flight.airline}</span> flight <span id="sp">{flight.title}</span> to {flight.ato}
               
              </li></Link>
            ))}
        </ul>
<br></br>
        <hr></hr>
        <br></br><br></br>
   
        <div className="link2">
          <Link to={"/add"} className="nav-link">
            Add flight
          </Link>
        </div>
  
      </div>

      </div>
   
  );
};

export default FlightsList;
