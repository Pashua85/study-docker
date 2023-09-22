const express = require("express");
const { connectDb } = require("./helpers/db");
const axios = require("axios");
const { host, port, db, authApiUrl } = require("./configuration");

const app = express();

const startServer = () => {
  app.listen(port, async () => {
    console.log(`Started api service on port:  ${port}!!!`);
    console.log(`On host ${host}`);
    console.log(`Database ${db}`);
  });
};

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

app.get("/api/test-api-data", (req, res) => {
  res.json({
    testWithApi: true,
  });
});

app.get("/test-with-user", (req, res) => {
  // console.log({ url: `${authApiUrl}/currentUser` });
  axios
    .get(authApiUrl + "/currentUser")
    .then((response) => {
      res.json({
        testCurrentUser: true,
        currentUserFromAuth: response.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

connectDb()
  .on("error", console.log)
  .on("disconnect", connectDb)
  .once("open", startServer);
