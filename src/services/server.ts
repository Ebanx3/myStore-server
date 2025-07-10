import { envs } from "../utils/envVariables.ts";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./router.ts";
import { requestLog} from "./middlewares/requestLog.ts";

class Server {
  public static instance: Server;

  private constructor() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PATCH"],
      })
    );
    app.use(requestLog)
    app.use("/api",router);
    app.use((_req, res) => {
      res.send("Undefined path");
    });
    app.listen(envs.PORT, () => {
      console.clear();
      console.log("Server up! Listening at port", envs.PORT);
    });
  }

  public static getInstance() {
    if (this.instance == null) this.instance = new Server();
    return this.instance;
  }
}

export default Server;
