const express = require("express");
const axios = require("axios");
const { connectDb } = require("./helpers/db");
const { host, port, db, apiUrl } = require("./configuration");

const app = express();

const startServer = () => {
  app.listen(port, async () => {
    console.log(`Started auth service on port:  ${port}`);
    console.log(`On host ${host}`);
    console.log(`Database ${db}`);
  });
};

app.get("/test", (req, res) => {
  res.send("Our auth server is working correctly");
});

app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "1234",
    email: "foo@gmail.com",
  });
});

app.get("/test-with-api-data", (req, res) => {
  axios
    .get(`${apiUrl}/test-api-data`)
    .then((response) => {
      res.json({
        testApiData: response.data,
      });
    })
    .catch((e) => {
      console.error(e);
    });
});

connectDb()
  .on("error", console.log)
  .on("disconnect", connectDb)
  .once("open", startServer);
