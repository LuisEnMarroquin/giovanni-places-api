const express = require("express");
const axios = require("axios");
const app = express();

const googleMapsKey = "AIzaSyCGcCbmNJ_iooOqKKoeqkwSbs_X0Y0Bdo8";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/getPlacesAll/:id", async (req, res) => {
  const reply = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.id}&types=address&key=${googleMapsKey}`
  );
  res.send(reply?.data);
});

app.get("/getPlaceDetails/:id", async (req, res) => {
  const reply = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.id}&key=${googleMapsKey}`
  );
  res.send(reply?.data);
});

app.post("/getRoutesToDestination", async (req, res) => {
  const reply = await axios.post(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.id}&key=${googleMapsKey}`,
    {
      origin: "Chicago, IL",
      destination: "Los Angeles, CA",
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(Date.now() + 5),
        trafficModel: "optimistic",
      },
    }
  );
  res.send(reply?.data);
});

const port = 8080;

app.listen(port, () => {
  console.log("Example app listening at http://%s:%s", "localhost", port);
});
