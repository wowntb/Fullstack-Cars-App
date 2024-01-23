# Car API

This simple RESTful API allows you to manage a list of cars.

## Instructions

To test this API you can use the Postman desktop app.

### Viewing the cars

1. In Postman set the HTTP method to GET.
2. Enter http://localhost:8080/api for the URL.
3. Click Send and the request will be made and show all the cars.

### Adding a car

1. In Postman set the HTTP method to POST.
2. Enter the URL for the API endpoint. Example: http://localhost:8080/api.
3. Go to the Body tab in Postman and select the raw option.
4. Choose JSON as the type of data to send.
5. In the text area, make sure to provide the make, model, and number of seats of the car. Like so (no need to provide an ID, one will automatically be generated.):

```json
{
    "make": "Toyota",
    "model": "Camry",
    "seats": 5:
}
```

6. Click Send and the request will be made.

### Deleting a car

1. In Postman set the HTTP method to DELETE.
2. Enter the URL for the API endpoint with the ID of any existing car. Example: http://localhost:8080/api/3. This is going to delete the car with the ID 4.
3. Click Send and the request will be made.

### Updating a car

1. In Postman set the HTTP method to PUT.
2. Enter the URL for the API endpoint with the ID of any existing car. Example: http://localhost:8080/api/4. This is going to update the car with the ID 4.
3. Go to the Body tab in Postman and select the raw option.
4. Choose JSON as the type of data to send.
5. In the text area, provide the updated information for the car. Example:

```json
{
  "seats": 5
}
```

6. Click Send and the request will be made.

## Contributors

Nathenale Bedane
