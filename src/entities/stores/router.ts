import { Router } from "express";
import StoresController from "./controller";
import { Authenticate } from "../../services/middlewares/authenticate";
import { validateBodyMiddleware } from "../../services/middlewares/validateBody";

const router = Router();

router.post("/", Authenticate, validateBodyMiddleware("createStore"), StoresController.create);
router.get('/byUser' , Authenticate, StoresController.getStoresByUserId );
router.patch('/changeStoreStatus/:storeName', Authenticate, StoresController.changeStoreStatus);
router.get('/storeIsMine/:storeName', Authenticate, StoresController.storeIsMine);

export default router;
