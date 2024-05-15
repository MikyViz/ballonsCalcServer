import { Project, /*ProjectStage,*/ Materials, Work, General, /*Menu,*/ Category, Subcategory, Type } from "../database/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

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
      encclude: ['imgPath']
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
const getProjectsImg = async (req, res) => {
  console.log(req);
  try {
    const img = await Project.findOne({
      where: {
        id: req.body.id
      },
      attributes: ['imgPath'],
    });
    if (img===undefined) {
      throw new Error("img is undefined");
    }
    console.log('you did it! the img is:', img);
    return img;
  } catch (error) {
    console.error(error);
    return error
    // res.status(500).send('Internal Server Error');
  }
};
const saveNewProjectFirst = async (req) => {
  try {
    console.log('req:', req);
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    let newProject = req.body;
    newProject.stylesNum = "null" ? null : parseInt(newProject.stylesNum);
    newProject.deviationPercentage = parseInt(newProject.deviationPercentage);
    newProject.discountPercent = parseInt(newProject.discountPercent);
    newProject.UserId = req.user.id;
    let imgPath = null;
    if (req.files && Object.keys(req.files).length !== 0) {
      let imgData = req.files.imgPath;
      imgPath = parentDir + '\\assets\\images\\' + imgData.name;
      imgData.mv(imgPath, function (err) {
        if (err) {
          console.log(`It's a little crap, bro 🥞 ${err}`);
          throw new Error(`It's a little crap, bro 🥞 ${err}`);
        }
        console.log('Yah!🕺You did it! The file has been saved to: ' + imgPath);
      });

    } else {
      imgPath = null;
    }
    newProject.imgPath = imgPath;

    const project = await Project.create(newProject);
    if (project) {
      // await project.save();
      console.log("good job👌1");
      return project;
    }
    return null;
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
  getProjectsImg,
  saveNewProjectFirst,
  saveNewProjectSecond,
  saveNewProjectThird,
  saveNewProjectFourth
}