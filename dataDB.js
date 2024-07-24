const dbConnect = require("./Database/conn");
const data = require("./Model/Data")

const DataJson = require("./data.json")

const start = async() =>{
    try{
        await dbConnect();
        await data.deleteMany();
        await data.create(DataJson);
        console.log("Every thing right");

    }catch(e){
        console.log(e);
    }
};

start();