import { Project, Materials, Work, General, } from "../database/index.js";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.resolve(__dirname, '..');

const getProjects = async (req, res) => {
  try {
    if (!req || !req.user.id) {
      throw new Error("Missing required parameter req.user.id😶‍🌫️");
    }
    const projects = await Project.findAll({
      where: {
        UserId: req.user.id
      },
    });
    if (!projects) {
      throw new Error("projects is null or undefined");
    }

    console.log(projects);
    return projects;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const saveNewProjectFirst = async (req) => {
  try {
    console.log('req:', req);
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    let newProject = req.body;
    newProject.stylesNum = (newProject.stylesNum === "null") ? null : parseInt(newProject.stylesNum);
    newProject.deviationPercentage = parseInt(newProject.deviationPercentage);
    newProject.discountPercent = parseInt(newProject.discountPercent);
    newProject.UserId = req.user.id;
    if (req.files && Object.keys(req.files).length !== 0) {
      let imgData = req.files.imgPath;
      const imgPath = path.join(parentDir, 'assets', 'images', imgData.name);
    try {
      await imgData.mv(imgPath);
      newProject.imgPath = `http://localhost:${process.env.MY_PORT}/${imgData.name}`;

      const project = await Project.create(newProject);
      if (project) {
        console.log('Yah!🕺You did it! The file has been saved to: ' + imgData.name);
        return project;
      }
      return null;
    } catch (err) {
      console.log(`It's a little crap, bro 🥞, your file wos not moved 👉 ${err}`);
      throw new Error(`It's a little crap, bro 🥞, your file wos not moved 👉 ${err}`);
    }
  }
} catch (error) {
    console.log(`👽hey doc... we have a little problem👉 ${error}`);
    throw new Error(error);
  }
};
const saveNewProjectSecond = async (newProjectMaterials) => {
  try {
    const projectMaterials = await Materials.create(newProjectMaterials);
    if (projectMaterials) {
      // await project.save();
      console.log("good job👌2");
      return projectMaterials;
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
};
const saveNewProjectThird = async (newProjectWorkHours) => {
  try {
    const projectWorkHours = await Work.create(newProjectWorkHours);
    if (projectWorkHours) {
      // await project.save();
      console.log("good job👌3");
      return projectWorkHours;
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
};
const saveNewProjectFourth = async (newProjectGeneral) => {
  try {
    const projectGeneral = await General.create(newProjectGeneral);
    if (projectGeneral) {
      // await project.save();
      console.log("good job👌4");
      return projectGeneral;
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  getProjects,
  saveNewProjectFirst,
  saveNewProjectSecond,
  saveNewProjectThird,
  saveNewProjectFourth
}