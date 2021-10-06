const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {

  try {
    await mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    });

    console.log('MongoDB Connected');
  } catch(err) {
        console.error(err.message);
        // It will exit if fails.
        process.exit(1);
  }

}

module.exports = connectDB;
