import projectService from "../services/projectService.js"

export default class projectController {

    static async getProjects(req, res) {
        try {
            const project = await projectService.getProjects(req, res);
            if (!project) {
                return res.status(404).json({ msg: "projects not found🙈" });
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }

    static async saveNewProjectFirst(req, res) {
        try {
            // let imgPath = null;
            // if (req.files && Object.keys(req.files).length !== 0) {
            //     let imgData = req.files.imgPath;
            //     imgPath = path.join('assets', 'images', imgData.name)
            //     imgData.mv(path.join(__dirname, '..', imgPath), function (err) {
            //         console.log(`something wrong, cap... ${err}`);
            //     });
            // }
            // newProject.imgPath = imgPath;
            const newProject = await projectService.saveNewProjectFirst(req);
            if (!newProject) {
                return res.status(404).json({ msg: "project was not saved... sory, bro¯\_(ツ)_/¯" });
            }
            res.status(200).json(newProject);
        } catch (error) {
            res.status(500).json(`It's a little crap, bro 🥞 ${error}`);
        }
    }

    static async saveNewProjectSecond(req, res) { //MATH MENU BRO ... EAH!!!
        try {
            const newProjectMaterials = await projectService.saveNewProjectSecond(req.body);
            if (!newProjectMaterials) {
                return res.status(404).json({ msg: "project was not saved... sory, bro¯\_(ツ)_/¯" });
            }
            res.status(200).json(newProjectMaterials);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
    static async saveNewProjectThird(req, res) { //WORK MENU BRO ... EAH!!!
        try {
            const newProjectWorkHours = await projectService.saveNewProjectThird(req.body);
            if (!newProjectWorkHours) {
                return res.status(404).json({ msg: "project was not saved... sory, bro¯\_(ツ)_/¯" });
            }
            res.status(200).json(newProjectWorkHours);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
    static async saveNewProjectFourth(req, res) { //GEN MENU BRO ... EAH!!!
        try {
            const newProjectGeneral = await projectService.saveNewProjectFourth(req.body);
            if (!newProjectGeneral) {
                return res.status(404).json({ msg: "project was not saved... sory, bro¯\_(ツ)_/¯" });
            }
            res.status(200).json(newProjectGeneral);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
}