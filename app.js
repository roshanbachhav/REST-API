// import express from "express"
const express = require("express");
const app = express();
const PORT = process.env.PORT || 1000

const data_routes = require("./Routes/Data")

const dbConnect = require("./Database/conn")

app.get("/", (request, response) => {
    console.log("Received a request at /");
    response.send("Welcome to root path of api");
});

app.use("/api/data" , data_routes);

const start = async () => {
    try{
        await dbConnect();
        
        app.listen(PORT, () =>{
            console.log(`${PORT} is live`);
        })
    }catch(e){
        console.log(e);
    }
};

start();