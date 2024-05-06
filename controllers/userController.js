import userService from "../services/userService.js"

export default class UserController {
    
    static async login(req, res) {
        try {
            const user = await userService.login(req.body);
            if (!user) {
                return res.status(404).json({msg: "User not found🙈"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async register(req, res) {
        try {
            const user = await userService.register(req.body);
            if (!user) {
                return res.status(404).json({msg: "💩"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async me(req, res) {
        try {
            console.log(req.user);
            const user = await userService.me(req.user);
            if (!user) {
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    // static async getProjects(req, res) {
    //     try {
    //         const project = await userService.getprojects(req, res);
    //         if (!project) {
    //             return res.status(404).json({msg: "projects not found🙈"});
    //         }
    //         res.status(200).json(project);
    //     } catch (error) {
    //         res.status(500).json({msg: error.message});
    //     }
    // }
}