import mongoose from 'mongoose';
import { logger } from './logger';


const connectToDatabase = async ({ url }: any) => {
  try {
    const connection = await mongoose.connect(url);
    logger.info("***********connected to the db************")
    return connection.connection.db;
  } catch (error) {
    throw error;
  }
};

export default connectToDatabase;
