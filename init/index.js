require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.MONGODB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69d7b123b641b1e9102c4aa6",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
