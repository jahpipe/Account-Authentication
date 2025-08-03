import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import dbConfig from "./dbconfig/dbConfig";
import AccountRouter from "../src/router/AccountRouter"

dotenv.config()

//db connection//
dbConfig()


const app = express()


//MIDDLE WARE//
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors())

//ROUTER//
app.use("/api", AccountRouter)

//PORT Connection//
const port = process.env.PORT || 4000;


app.listen(port, () =>{
    console.log("you are connected to PORT:", port )
})
