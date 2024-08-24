const mongoose = require("mongoose");
const url =
  "mongodb+srv://husnainahmad6633:ahmad027@cluster0.35mpklw.mongodb.net/E-dashboard?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Datatbase connected succesfully");
  } catch (error) {
    console.log("Error connecting database");
    console.log(error);
  }
};
module.exports = connectDB;
