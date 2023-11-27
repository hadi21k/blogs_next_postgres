import { Client } from "pg";

const connectToDB = async () => {
  console.log(process.env.DATABASE_PORT)
  try {
    const client = new Client({
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE,
    });

    await client.connect();
    console.log("Connected to database");
    return client;
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
