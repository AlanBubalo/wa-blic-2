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
        price: parseFloat(price),
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

// GET BRAND
app.get("/getBrand", async (req, res) => {
    let db = await connect("wa-blic-2");
    let brand = req.query["brand"];
    let query = { brand: brand };
    let cursor = await db.collection("collection").find(query);
    let items = await cursor.toArray();
    let items_filtered = items.map((item) => {
        return {
            name: item.name,
            price: item.price,
        };
    });
    if (items) {
        res.json({
            status: "OK",
            data: {
                brand: brand,
                items: items_filtered,
            },
        });
    } else {
        res.json({
            status: "Failed",
            message: `Brand ${brand} no found in DB`,
        });
    }
});

// GET ITEM BY ID
app.get("/getItemById", async (req, res) => {
    let db = await connect("wa-blic-2");
    let id = req.query["id"];
    let query = { _id: mongo.ObjectId(id) };
    let item = await db.collection("collection").findOne(query);
    if (item) {
        res.json({
            status: "OK",
            data: {
                item: item,
            },
        });
    } else {
        res.json({
            status: "Failed",
            message: `Couldn't find item by id ${id}`,
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
