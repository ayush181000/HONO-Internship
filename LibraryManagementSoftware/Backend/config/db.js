import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // strictQuery: false,
    });
    console.log(`mongo db connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
