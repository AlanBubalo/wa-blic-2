import mongo from "mongodb";
import express from "express";
import connect from "./db.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
