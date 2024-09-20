const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors()); //front end sy backend ko data aa saky
app.use(express.json());

const mongoose = require("mongoose");
const user_login = require("./Login_schema");
var url = "mongodb://localhost:27017/test";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("conned to mongodb");
  });

// Existing POST route for login
app.post("/post", async (req, res) => {
  const { email, password } = req.body; //data is comming from form end login input fields
  try {
     // Create a new user_login instance with the received email and password
     const newLogin = new user_login({
        email: email,
        password: password,
      });
  
      // Save the new login data to MongoDB
      const savedLogin = await newLogin.save();
  
      // Send back the saved data as a response
      res.status(201).send({ message: "User saved successfully", savedLogin });
  } catch (error) {
    res.status(500).send({ message: "faild" });
  }
});

// New GET route for retrieving login data
app.get("/get", async (req, res) => {
  try {
    // Fetch all login data from the database
    const allLogins = await user_login.find();
    res.send(allLogins); // Return the fetched login data
  } catch (error) {
    res.status(500).send({ message: "Error retrieving login data" });
  }
});

app.listen(port, () => {
  console.log("running on port 4000");
});
