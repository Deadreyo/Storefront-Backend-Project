import express from 'express'
import { postProduct, getProductByID, getProductsIndex, postProductToOrderByID, getTopProducts } from '../../handlers/productHandler'
import verifyAuthToken from '../../middleware/authorization';
import { idValidation, postProductToOrderValidation, postProductValidation } from '../../middleware/inputsValidation';

const productsRouter = express.Router()

productsRouter.get('/', getProductsIndex);
productsRouter.get('/top', getTopProducts)
productsRouter.get('/:id', idValidation, getProductByID);
productsRouter.post('/', verifyAuthToken, postProductValidation, postProduct);
productsRouter.post('/:id', verifyAuthToken, idValidation, postProductToOrderValidation, postProductToOrderByID)

export default productsRouter;