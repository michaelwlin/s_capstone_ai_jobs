// import { config } from "dotenv"
// import { connectToDB } from "./connect.js"

// config()
// await connectToDB(process.env.DB_URI)


const app = require("./app");
const db = require("./db");

db.connect().then(() => {
  console.log("Connected to MongoDB: " + db.url);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
