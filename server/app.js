// App.js

const express = require("express") // We are using the express library for the web server
const app = express() // We need to instantiate an express object to interact with the server in our code
PORT = 4000 // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
app.get("/", (req, res) => {
  // This is the basic syntax for what is called a 'route'
  res.json({message: "Hello from server!"})
}) // requesting the web site.

/*
    LISTENER
*/
app.listen(PORT, () => {
  // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate.",
  )
})

// mongo DB
