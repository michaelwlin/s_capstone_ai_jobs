require('dotenv').config();
const mongoose = require("mongoose");
const Jobs = require("./models/jobs");

const dbUrl = process.env.DB_URI || "mongodb://localhost/matchiq";



async function createUniqueIndex() {
  const indexExists = await Jobs.collection.indexExists('url');

  if (!indexExists) {
    await Jobs.collection.createIndex({ url: 1 }, { unique: true });
    console.log('Unique index on url field created');
  } else {
    console.log('Unique index on url field already exists');
  }
}

const connect = async () => {
  await mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected to MongoDB: " + dbUrl);

  await createUniqueIndex();
};

const close = () => mongoose.connection.close();

module.exports = { connect, close, url: dbUrl };
