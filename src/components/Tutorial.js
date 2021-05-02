import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";

const Flight = (props) => {
  const initialFlightState = {
    id: null,
    title: "",
    description: "",
  };
  const [currentFlight, setCurrentFlight] = useState(initialFlightState);
  const [message, setMessage] = useState("");

  const getFlight = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        setCurrentFlight(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlight(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFlight({ ...currentFlight, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentFlight.id,
      title: currentFlight.title,
      description: currentFlight.description,
      published: status,
    };

    TutorialDataService.update(currentFlight.id, data)
      .then((response) => {
        setCurrentFlight({ ...currentFlight, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateFlight = () => {
    TutorialDataService.update(currentFlight.id, currentFlight)
      .then((response) => {
        console.log(response.data);
        setMessage("The flight was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFlight = () => {
    TutorialDataService.remove(currentFlight.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/flights");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentFlight ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentFlight.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentFlight.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentFlight.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentFlight.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteFlight}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateFlight}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Flight...</p>
        </div>
      )}
    </div>
  );
};

export default Flight;
