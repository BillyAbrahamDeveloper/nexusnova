import mongoose from 'mongoose';

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connected to DB successfully');
    });

    connection.on('error', (err) => {
      console.log('Something is wrong with DB please check', err);
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong');
    console.log(errors);
  }
}
