import dataService from "../services/dataService.js"

export default class dataController {
    
    static async getData(req, res) {
        try {
            const data = await dataService.getData(req, res);
            if (!data) {
                return res.status(404).json({msg: "data not found🙈"});
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
}