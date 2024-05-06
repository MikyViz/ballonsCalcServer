import { Stage, Category, Subcategory, Type } from "../database/index.js";


const getData = async (req, res) => {
    try {
        const data = await Stage.findAll({
            include: [{
                model: Category,
                as: 'categories',
                include: [
                    {
                        model: Subcategory,
                        as: 'subcategories',
                        include: [
                            {
                                model: Type,
                                as: 'types',
                            }
                        ]
                    }
                ]
            }]
        });
        // res.json(data);
        return data;
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export default {
    getData
}