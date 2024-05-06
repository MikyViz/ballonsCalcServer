import { User } from "../database/index.js";
import { Project } from "../database/index.js";

import bcrypt from 'bcrypt';



const login = async ({ email, password }) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                user.token = user.generateJWT();
                await user.save();
                console.log("login is OK👌");
                return user;
            }
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}



const register = async (newUser) => {
    try {
        const user = await User.create(newUser);
        if (user) {
            user.token = user.generateJWT();
            await user.save();
            return user;
        }
        return null;
    } catch (error) {
        console.log(`💩 ${error}`);
        throw new Error(error);
    }
};

const me = async (user) => {
    try {
        if (user) {
            return user;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

// const getProjects = async (req, res) => {
//     try {
//         const categories = await Project.findAll({
//             where: {
//                 userId: id//???????????????
//             }
//         });
//         res.json(categories);
//         return;
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// };

export default {
    login,
    register,
    // getProjects,
    me
}