import express from "express";
import UserRouter from "./routers/userRouter.js";
import DataRouter from "./routers/dataRouter.js";
import ProjectRouter from "./routers/projectRouter.js";
import { syncModels } from "./database/index.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import dotenv from "dotenv";

const app = express();

dotenv.config();
syncModels();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true}));

app.use("/users", new UserRouter().getRouter());

app.use("/data", new DataRouter().getRouter());

app.use("/project", new ProjectRouter().getRouter());


app.listen(3000, () => {
    console.log("Server running on port 3000");
}
);