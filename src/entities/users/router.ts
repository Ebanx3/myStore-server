import { Router } from "express";
import UserController from "./controllers";
import { validateBodyMiddleware } from "../../services/middlewares/validateBody";

const router = Router();

router.post("/signup", validateBodyMiddleware("signup"), UserController.signup);
router.post("/login", validateBodyMiddleware("login"), UserController.login);
router.get("/verifyEmail/:verificationCode", UserController.verifiyEmail);

export default router;