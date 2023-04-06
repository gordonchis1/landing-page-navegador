require("dotenv").config()

const mongoose = require("mongoose")

const connectionString = process.env.MONGO_PASSWORD

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(data => {console.log("data base connected")})

  
