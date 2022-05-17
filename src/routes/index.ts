import express from 'express'
import ordersRouter from './orders/ordersRouter';
import productsRouter from './products/productRouter';
import usersRouter from './users/usersRouter'

const routes = express.Router()

routes.get('/', (req, res) => {
    res.json("Available Routes: /users - /products - /orders");
})
routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);

export default routes;