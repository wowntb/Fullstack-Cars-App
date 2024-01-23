import React, { useState, useEffect } from "react";

const DisplayCars = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ make: "", model: "", seats: 0 });
  const [editCar, setEditCar] = useState({ make: "", model: "", seats: 0 });
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    // Fetch the list of cars from the JSON file when the component mounts.
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
      body: JSON.stringify(newCar),
    })
      .then((response) => response.json())
      .then((data) => {
        setCars([...cars, data]);
        setNewCar({ make: "", model: "", seats: 0 });
      })
      .catch((error) => console.error("Error adding car:", error));
  };

  const deleteCar = (id) => {
    // Send a DELETE request to remove a car.
    fetch(`/api/${id}`, {
      method: "DELETE",
    })
      .then(() => setCars(cars.filter((car) => car.id !== id)))
      .catch((error) => console.error("Error deleting car:", error));
  };

  const startEditMode = (id) => {
    setEditMode(id);
    const carToEdit = cars.find((car) => car.id === id);
    setEditCar(carToEdit);
  };

  const cancelEditMode = () => {
    setEditMode(null);
    setEditCar({ make: "", model: "", seats: 0 });
  };

  const updateCar = (id) => {
    // Send a PUT request to update a car
    fetch(`/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editCar),
    })
      .then(() => {
        setCars(
          cars.map((car) => (car.id === id ? { ...car, ...editCar } : car))
        );
        setEditMode(null);
        setEditCar({ make: "", model: "", seats: 0 });
      })
      .catch((error) => console.error("Error updating car:", error));
  };

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
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
                <button onClick={() => updateCar(car.id)}>Update</button>&nbsp;
                <button onClick={cancelEditMode}>Cancel</button>
              </div>
            ) : (
              <div>
                {car.make} {car.model} ({car.seats} seats)&nbsp;
                <button onClick={() => deleteCar(car.id)}>Delete</button>&nbsp;
                <button onClick={() => startEditMode(car.id)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Add New Car</h2>
      <input
        type="text"
        value={newCar.make}
        name="make"
        placeholder="Make"
        onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
      />
      <input
        type="text"
        value={newCar.model}
        name="model"
        placeholder="Model"
        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
      />
      <input
        type="text"
        value={newCar.seats}
        name="seats"
        placeholder="Seats"
        onChange={(e) => setNewCar({ ...newCar, seats: e.target.value })}
      />
      <button onClick={addCar}>Add Car</button>
    </div>
  );
};

export default DisplayCars;
