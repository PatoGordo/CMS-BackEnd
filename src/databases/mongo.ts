import { connect } from "mongoose";
import "dotenv/config";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

async function connectToDB() {
  await connect(
    `mongodb+srv://${dbUser}:${dbPassword}@patogordo.4g2iz.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );

  console.log("📂 Connected to DataBase");
}

export { connectToDB };
