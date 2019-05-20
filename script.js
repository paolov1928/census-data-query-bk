require('dotenv').config()

const express = require("express")
const mysql = require("mysql")
const app = express()
const portNumber = 1337
const cors = require("cors")
const keys = require("./listOfKeys")



const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL
})

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack)
    return
  }

  console.log("connected as id " + connection.threadId)
})

app.use(cors())

app.get("/", (req, res) => res.send("Welcome to Paolo's node & express app!"))

app.get("/api/censusDB", function(req, resp) {
  const currentSelection = req.query.key
  // put in if part about having to put query in
  connection.query(
    `SELECT ${currentSelection} AS Variable, COUNT(${currentSelection}) AS Count, CAST(AVG (age) AS DECIMAL (10,2)) AS Average_Age FROM census_learn_sql GROUP BY ${currentSelection} ORDER BY COUNT(${currentSelection}) DESC LIMIT 100`,
    function(error, rows, fields) {
      if (!!error) {
        console.log("Error in the query")
      } else {
        console.log("Query successful"+Math.random())
        resp.send(rows)
      }
    }
  )
})

app.listen(portNumber, () => {
  console.log(`listening on port: ${portNumber}`)
})

// example queries
// "SELECT * FROM census_learn_sql WHERE age = 28"
// "SELECT Education AS Variable, COUNT(education) AS Count, CAST(AVG (age) AS DECIMAL (12,2)) AS Average_Age FROM census_learn_sql GROUP BY education ORDER BY COUNT(education) DESC LIMIT 100"
// numbers that work are 4,10,40
