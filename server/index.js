const app = require("./app"); // Assuming you renamed the merged server to CombinedServer.js
const db = require("./db");

db.connect().then(() => {
  console.log("Connected to MongoDB: " + db.url);
});

const port = process.env.PORT || 4000; // Use Heroku's dynamic port or 4000 for local development

app.listen(port, () => console.log(`Server started on port ${port}...`));