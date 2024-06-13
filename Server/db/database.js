import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/docker-projekt';

async function connectToDb() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
}

export default connectToDb;
