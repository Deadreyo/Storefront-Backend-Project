import express from 'express'
import { createOrder, getOrderByID, getOrdersIndex } from '../../handlers/orderHandler';
import verifyAuthToken from '../../middleware/authorization';
import { idValidation, postOrderValidation } from '../../middleware/inputsValidation';

const ordersRouter = express.Router();

ordersRouter.get('/', verifyAuthToken, getOrdersIndex);
ordersRouter.get('/:id', verifyAuthToken, idValidation, getOrderByID);
ordersRouter.post('/', verifyAuthToken, postOrderValidation, createOrder);

export default ordersRouter;