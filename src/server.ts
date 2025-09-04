import dotenv from 'dotenv';
import app from './app';
import { connectDatabase } from './config/db';

dotenv.config();

const port = Number(process.env.PORT || 4000);

const start = async () => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();


