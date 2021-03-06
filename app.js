const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

const corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to REST API Node.js/Express/MySQL application." })
})

require("./user.routes.js")(app)

// set port, listen for requests
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
