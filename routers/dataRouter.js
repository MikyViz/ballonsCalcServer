import express from 'express';
import dataController from '../controllers/dataController.js';

const router = express.Router();

export default class dataRouter {
    constructor() {
        router.get('/getData', dataController.getData);
    }

    getRouter() {
        return router;
    }
}