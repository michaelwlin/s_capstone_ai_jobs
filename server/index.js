const app = require("./app");
const auth_server = require("./auth_server")
const db = require("./db");

db.connect().then(() => {
  console.log("Connected to MongoDB: " + db.url);
});

const port = process.env.APP_PORT || 4000;
const auth_port = process.env.AUTH_PORT || 4500;

app.listen(port, () => console.log(`Server started on port ${port}...`));
auth_server.listen(auth_port, () => console.log(`Server started on port ${auth_port}...`));
