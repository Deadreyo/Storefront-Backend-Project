import express from 'express'
import { getActiveOrdersForUsersByID, getCompleteOrdersForUsersByID } from '../../handlers/orderHandler';
import { authorizeUser, createUser, getUserById, getUserIndex } from '../../handlers/userHandler';
import verifyAuthToken from '../../middleware/authorization';
import { idValidation, postUserValidation } from '../../middleware/inputsValidation';

const usersRouter = express.Router()

usersRouter.get('/', verifyAuthToken, getUserIndex);
usersRouter.get('/:id', verifyAuthToken, idValidation, getUserById);
usersRouter.get('/:id/active', verifyAuthToken, idValidation, getActiveOrdersForUsersByID);
usersRouter.get('/:id/complete', verifyAuthToken, idValidation, getCompleteOrdersForUsersByID);
usersRouter.post('/', postUserValidation, createUser);
usersRouter.post('/auth', postUserValidation, authorizeUser)

export default usersRouter;