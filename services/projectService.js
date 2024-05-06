import { Project, /*ProjectStage,*/ Materials, Work, General, /*Menu,*/ Category, Subcategory, Type } from "../database/index.js";


const getProjects = async (req, res) => {
  try {
    if (!req || !req.user.id) {
      throw new Error("Missing required parameter req.user.id😶‍🌫️");
    }
    const projects = await Project.findAll({
      where: {
        UserId: req.user.id
      }
    });
    if (!projects) {
      throw new Error("projects is null or undefined");
    }
    // res.json(projects);

    console.log(projects);
    return projects;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const saveNewProjectFirst = async (newProject) => {
  try {
    const project = await Project.create(newProject);
    if (project) {
      // await project.save();
      console.log("good job👌1");
      return project;
    }
    return null;
  } catch (error) {
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