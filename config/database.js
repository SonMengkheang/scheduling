const mongoose = require("mongoose");
const config = require("config");
const databaseRemoteURL = config.get("mongoURL");

const connectDB = async () => {
  let databaseConfig = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  try {
    await mongoose.connect(databaseRemoteURL, databaseConfig);
    console.log("Connected to DB...!");
  } catch (err) {
    console.log("Database connection error", err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
