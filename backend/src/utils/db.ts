import { Sequelize } from 'sequelize-typescript';
import { DATABASE_URL } from './config';

if (!DATABASE_URL) {
  throw new Error('Database url is not defined');
}

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  console.log('Connecting to', DATABASE_URL);
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (err) {
    console.log('Failed to connect to the database');
    return process.exit(1);
  }

  return null;
};

export { connectToDatabase, sequelize };
