import { Router } from "express";
import StoresController from "./controller";
import { Authenticate } from "../../services/middlewares/authenticate";
import { validateBodyMiddleware } from "../../services/middlewares/validateBody";

const router = Router();

router.post(
  "/",
  Authenticate,
  validateBodyMiddleware("createStore"),
  StoresController.create
);

export default router;
