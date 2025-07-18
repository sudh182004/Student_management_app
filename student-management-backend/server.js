const express = require("express")
const app = express()
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config()
const studentDatabase = require("./db/studentDatabase")
const studentRoutes = require("./routes/studentRoutes")

app.use(cors());
app.use(express.json())

app.use("/api/students",studentRoutes)

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
