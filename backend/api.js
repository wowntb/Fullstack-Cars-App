// This simple RESTful API allows you to manage a list of cars.
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8000;
const jsonFilePath = "cars.json";

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "cars-frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "cars-frontend", "build", "index.html")
    );
  });
}

app.use(express.static(path.join(__dirname, "cars-frontend/build")));

// Body-praser is middleware used to parse JSON.
app.use(bodyParser.json());

// An empty array of cars is initialised.
let cars = [];
// The program will try to populate the array with the contents of the cars.json file.
try {
  const data = fs.readFileSync(jsonFilePath, "utf8");
  cars = JSON.parse(data);
} catch (err) {
  console.error("Error reading cars data from file:", err.message);
}

// This will save the data from the cars array to the JSON file.
const saveDataToFile = () => {
  // The cars array is stringified and stored in jsonData.
  const jsonData = JSON.stringify(cars);
  // jsonData is then used to overwrite the contents of cars.json.
  fs.writeFileSync(jsonFilePath, jsonData, "utf8");
};

// A GET request at this path will display all the cars in the JSON file.
app.get("/api", (req, res) => {
  res.json(cars);
});

// A POST request will add a new car to the list.
app.post("/api", (req, res) => {
  const newCar = req.body;
  newCar.id = cars.length + 1;
  cars.push(newCar);
  saveDataToFile();
  res.json(newCar);
});

// A DELETE request will delete a car by the ID provided.
app.delete("/api/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  cars = cars.filter((car) => car.id !== carId);
  saveDataToFile();
  res.json({ message: "Car deleted successfully" });
});

// A PUT request will update a car by the ID given.
app.put("/api/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCar = req.body;

  cars = cars.map((car) =>
    car.id === carId ? { ...car, ...updatedCar } : car
  );

  saveDataToFile();
  res.json({ message: "Car updated successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
