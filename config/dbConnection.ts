const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI
    //     ,{
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }
);
    console.log(
      "MongoDB Connected...",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
