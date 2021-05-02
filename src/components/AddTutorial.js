import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddFlight = () => {
  const initialFlightState = {
    id: null,
    title: "",
    description: "",
    ato: "",
    gate: "",
    airline: "",
  };
  const [flight, setFlight] = useState(initialFlightState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFlight({ ...flight, [name]: value });
  };

  const saveFlight = () => {
    var data = {
      title: flight.title,
      description: flight.description,
      ato: flight.ato,
      airline: flight.airline,
      gate: flight.gate,
    };

    TutorialDataService.create(data)
      .then((response) => {
        setFlight({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          ato: response.data.ato,
          gate: response.data.gate,
          airline: response.data.airline,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newFlight = () => {
    setFlight(initialFlightState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newFlight}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="ato">Airline</label>
            <input
              type="text"
              className="form-control"
              id="airline"
              required
              value={flight.airline}
              onChange={handleInputChange}
              name="airline"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Flight Number</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={flight.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ato">To</label>
            <input
              type="text"
              className="form-control"
              id="ato"
              required
              value={flight.ato}
              onChange={handleInputChange}
              name="ato"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Scheduled</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={flight.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ato">Gate</label>
            <input
              type="text"
              className="form-control"
              id="gate"
              required
              value={flight.gate}
              onChange={handleInputChange}
              name="gate"
            />
          </div>

          <button onClick={saveFlight} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFlight;
