import Router from "express";

import ProductsRouter from '../entities/products/router';
import StoreRouter from '../entities/stores/router';
import AuthenticationRouter from '../entities/users/router';

const router = Router();

router.use("/product", ProductsRouter);
router.use("/store", StoreRouter);
router.use('/auth', AuthenticationRouter);

export default router;