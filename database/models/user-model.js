import { sequelize } from "../index.js";
import { DataTypes, literal } from "sequelize";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
// import { UUIDV4 } from "uuid";
const User = sequelize.define("User", {
    // Model attributes are defined here
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            len: [2, 35],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            // isEmail: true,
            // len: [10, 35],
        },
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            // len: [10, 18]
        },
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            len: [6, 200],
        },
    },
    token: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM("active", "inactive")
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        },
        // beforeUpdate: async (user) => {
        //     if (user.password){
        //     const saltRounds = 10;
        //     user.password = await bcrypt.hash(user.password, saltRounds);
        // }
        // }
    }
});

User.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

User.prototype.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        email: this.email,
        id: this.id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
}

User.prototype.toAuthJSON = function () {
    return {
        id: this.id,
        email: this.email,
        token: this.generateJWT(),
    };
};


export default User;