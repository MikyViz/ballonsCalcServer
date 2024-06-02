import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

export default class UserRouter {
    constructor() {
        router.post('/login', userController.login);
        router.put('/set', auth, userController.set);
        router.post('/register', userController.register);
        router.post('/me', auth, userController.me);
    }

    getRouter() {
        return router;
    }
}