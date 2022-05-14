import express, { Application } from "express";
import cors from "cors";
import { routes } from "@/routes";
import { connectToDB } from "./databases/mongo";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes() {
    this.app.use(routes);
  }

  private async database() {
    await connectToDB();
  }
}

export default new App().app;
