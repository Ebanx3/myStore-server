import Router from "express";
import MessagesController from "./controller";
import { Authenticate } from "../../services/middlewares/authenticate";
import { validateBodyMiddleware } from "../../services/middlewares/validateBody";

const router = Router();

router.get('/:productId', MessagesController.getAllByProductId);
router.post('/', Authenticate, validateBodyMiddleware('createMessage') ,MessagesController.create)

export default router;