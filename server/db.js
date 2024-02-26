const mongoose = require("mongoose");
const Jobs = require("./models/jobs");
const vault = require("node-vault")({
  apiVersion: 'v1',
  endpoint: 'http://127.0.0.1:8200',
  token: 'ABLMW'
});

async function initDB() {
  try {
    const data = await vault.read('secret/myapp');
    const dbUrl = data.data.DB_URI || "mongodb://localhost/matchiq";

    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to database.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

initDB();

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
