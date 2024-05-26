import express from 'express';
import auth from '../middlewares/auth.js';
import projectController from '../controllers/projectController.js';

const router = express.Router();

export default class projectRouter {
    constructor() {
        router.get('/getProjects', auth, projectController.getProjects);
        router.post('/saveNewProject1', auth, projectController.saveNewProjectFirst);
        router.post('/saveNewProject2', auth, projectController.saveNewProjectSecond);
        router.post('/saveNewProject3', auth, projectController.saveNewProjectThird);
        router.post('/saveNewProject4', auth, projectController.saveNewProjectFourth);
    }

    getRouter() {
        return router;
    }
}