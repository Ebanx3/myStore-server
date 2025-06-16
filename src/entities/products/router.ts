import { Router } from "express";
import ProductsController from "./controller";
import { validateBodyMiddleware } from "../../services/middlewares/validateBody";

const router = Router();

router.get('/:storeName', ProductsController.getAll);
router.get('/:storeName/:productId', ProductsController.getById)
router.post('/:storeName', validateBodyMiddleware('addProduct') ,ProductsController.add);

export default router;