import mongo from "mongodb";
import express from "express";
import connect from "./db.js";

const app = express();
const port = 7642;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SAVE ITEM
app.post("/saveItem", async (req, res) => {
    let db = await connect("wa-blic-2");
    let { name, price, brand } = req.body;
    let item = await db.collection("collection").insertOne({
        name: name,
        price: ~~price,
        brand: brand,
    });
    if (item) {
        res.json({
            status: "OK",
            message: `Item ${name} saved in DB`,
        });
    } else {
        res.json({
            status: "Failed",
            message: "Couldn't save item in DB",
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
