import { User } from "../database/index.js";
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.resolve(__dirname, '..');

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

const set = async (req) => {
    try {
        let updatedInfo = req.body;
        
        // updatedInfo.name = (updatedInfo.name === "") ? User.name : updatedInfo.name;
        // updatedInfo.email = (updatedInfo.email === "") ? User.email : updatedInfo.email;
        // updatedInfo.phone = (updatedInfo.phone === "") ? null : parseInt(updatedInfo.phone);
        // updatedInfo.password = (updatedInfo.password === "") ? null : updatedInfo.password;

        for (let key in updatedInfo) {
            if (!updatedInfo.key)
                delete updatedInfo[key];
        };

        if (updatedInfo?.phone) updatedInfo.phone = parseInt(updatedInfo.phone);

        if (req.files && Object.keys(req.files).length !== 0) {
            let imgData = req.files.img;
            const imgPath = path.join(parentDir, 'assets', 'avatars', imgData.name);
            try {
                await imgData.mv(imgPath);
                updatedInfo.img = `http://localhost:${process.env.MY_PORT}/${imgData.name}`;

                // const user = await User.update(updatedInfo);
                // const updatedUser = await User.update(updatedInfo, { where: { id: req.user.id } });

                // if (updatedUser) {
                //     console.log('Yah!🕺You did it! The avatar has been saved to: ' + imgData.name);
                //     return updatedUser;
                // }
                // return null;
                const [rowsUpdate, [updatedUser]] = await User.update(updatedInfo, {
                    where: { id: req.user.id },
                    returning: true,
                });
        
                return rowsUpdate ? updatedUser : null;
            } catch (err) {
                console.log(`It's a little crap, bro 🥞, your avatar was not moved 👉 ${err}`);
                throw new Error(`It's a little crap, bro 🥞, your avatar was not moved 👉 ${err}`);
            }
        }
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

export default {
    login,
    register,
    me,
    set
}