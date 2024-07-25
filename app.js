const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

const data_routes = require("./Routes/Data");
const dbConnect = require("./Database/conn");

app.use(cors());


app.get("/", (request, response) => {
  console.log("Received a request at /");
  response.send("Welcome to root path of API");
});


app.use("/api/data", data_routes);

const start = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`${PORT} is live`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
