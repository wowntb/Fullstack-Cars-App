import React, { useState, useEffect } from "react";

const DisplayCars = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    seats: 0,
    URL: "",
  });
  const [editCar, setEditCar] = useState({
    make: "",
    model: "",
    seats: 0,
    URL: "",
  });
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    // useEffect will fetch the list of cars from the JSON file when the component mounts.
    // NOTE: A proxy is set up in the frontend's package.json.
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addCar = () => {
    // Send a POST request to add a new car.
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // The POST request sends to the API the details of the new car in the request body.
      body: JSON.stringify(newCar),
    })
      .then((response) => response.json())
      .then((data) => {
        // On a successful response, the new car data is added to the cars state, and the input fields for the new car are reset.
        setCars([...cars, data]);
        setNewCar({ make: "", model: "", seats: 0, URL: "" });
      })
      .catch((error) => console.error("Error adding car:", error));
  };

  const deleteCar = (id) => {
    // Send a DELETE request to remove a car. This method will be called onClick.
    fetch(`/api/${id}`, {
      method: "DELETE",
    })
      // The car is removed from the cars state.
      .then(() => setCars(cars.filter((car) => car.id !== id)))
      .catch((error) => console.error("Error deleting car:", error));
  };

  const startEditMode = (id) => {
    // This method is called when the user wants to edit a car.
    // It sets the editMode state to the ID of the car being edited and populates the editCar state with the details of the selected car.
    setEditMode(id);
    const carToEdit = cars.find((car) => car.id === id);
    setEditCar(carToEdit);
  };

  const cancelEditMode = () => {
    // This method is called when the user cancels the editing of a car.
    // It resets the editMode state to null and clears the editCar state.
    setEditMode(null);
    setEditCar({ make: "", model: "", seats: 0, URL: "" });
  };

  const updateCar = (id) => {
    // This method is called when the user wants to update the details of a car.
    fetch(`/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editCar),
    })
      .then(() => {
        // On a successful response, the cars state is updated with the modified details, and the editing mode is canceled.
        setCars(
          cars.map((car) => (car.id === id ? { ...car, ...editCar } : car))
        );
        setEditMode(null);
        setEditCar({ make: "", model: "", seats: 0, URL: "" });
      })
      .catch((error) => console.error("Error updating car:", error));
  };

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {/* The cars from the state are mapped as list items. */}
        {cars.map((car) => (
          <li key={car.id}>
            {/* If the state of editMode is the ID of a car, they can modify its details in input boxes. */}
            {editMode === car.id ? (
              <div>
                {/* This is the input box for the make of the car. */}
                <input
                  type="text"
                  value={editCar.make}
                  name="make"
                  placeholder="Make"
                  onChange={(e) =>
                    setEditCar({ ...editCar, make: e.target.value })
                  }
                />
                &nbsp;
                {/* This is the input box for the model of the car. */}
                <input
                  type="text"
                  value={editCar.model}
                  name="model"
                  placeholder="Model"
                  onChange={(e) =>
                    setEditCar({ ...editCar, model: e.target.value })
                  }
                />
                &nbsp;
                {/* This is the input box for the number of seats in the car. */}
                <input
                  type="text"
                  value={editCar.seats}
                  name="seats"
                  placeholder="Seats"
                  onChange={(e) =>
                    setEditCar({ ...editCar, seats: e.target.value })
                  }
                />
                &nbsp;
                {/* This is the input box for the URL of the car. */}
                <input
                  type="text"
                  value={editCar.URL}
                  name="URL"
                  placeholder="Image URL"
                  onChange={(e) =>
                    setEditCar({ ...editCar, URL: e.target.value })
                  }
                />
                &nbsp;
                <button onClick={() => updateCar(car.id)}>Update</button>&nbsp;
                <button onClick={cancelEditMode}>Cancel</button>
              </div>
            ) : (
              // If the state of editMode is not the ID of a car then no input boxes will be rendered, just the information of the car as plain text.
              <div>
                {car.make} {car.model} ({car.seats} seats)&nbsp;
                <button onClick={() => deleteCar(car.id)}>Delete</button>&nbsp;
                <button onClick={() => startEditMode(car.id)}>Edit</button>
                <br />
                {/* Display the image directly on the page using the img tag. */}
                <img
                  className="car-image"
                  src={car.URL}
                  alt={car.make + car.model}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Add New Car</h2>
      {/* This section is where the user can add a car to the list. */}
      {/* This is the input box for the make of the car. */}
      <input
        type="text"
        value={newCar.make}
        name="make"
        placeholder="Make"
        onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
      />
      {/* This is the input box for the model of the car. */}
      <input
        type="text"
        value={newCar.model}
        name="model"
        placeholder="Model"
        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
      />
      {/* This is the input box for the number of seats the car has. */}
      <input
        type="text"
        value={newCar.seats}
        name="seats"
        placeholder="Seats"
        onChange={(e) => setNewCar({ ...newCar, seats: e.target.value })}
      />
      {/* This is the input box for the image URL of the car. */}
      <input
        type="text"
        value={newCar.URL}
        name="URL"
        placeholder="Image URL"
        onChange={(e) => setNewCar({ ...newCar, URL: e.target.value })}
      />
      <button onClick={addCar}>Add Car</button>
    </div>
  );
};

export default DisplayCars;
