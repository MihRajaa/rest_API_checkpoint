const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");
const User = require("./models/User");

const app = express();

app.use(express.json());

connectDB();
// CRUD

// POST

app.post("/user/post", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.send();
  } catch (error) {
    console.log(error.message);
  }
});

// GET

app.get("/user/get", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
});

// PUT: Update

app.put("/user/update/:id", async (req, res) => {
  try {
    const editedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(editedUser);
  } catch (error) {
    console.log(error.message);
  }
});

// delete

app.delete("/user/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server is running on port ${PORT}`);
});
