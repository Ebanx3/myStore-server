import { Router } from "express";
import ProductsController from "./controller";
import { validateBodyMiddleware } from "../../services/middlewares/validateBody";
import { Authenticate } from "../../services/middlewares/authenticate";

const router = Router();

router.get('/get-signature', Authenticate , ProductsController.getCloudinarySignature)
router.get('/:storeId', ProductsController.getAllByStoreId);
router.get('/byName/:storeName', ProductsController.getAllByStoreName);
router.get('/product/:productId', ProductsController.getById)
router.post('/', validateBodyMiddleware('addProduct') ,ProductsController.add);

export default router;