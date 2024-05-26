import User from "./user-model.js"
import sequelize from "../db-mysql.js";
import { DataTypes, Model } from "sequelize";

class Materials extends Model { }
Materials.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ballonsInCube: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "materials",

  }
);
class Work extends Model { }
Work.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "works",

  }
);
class General extends Model { }
General.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "generals",
  }
);

class Project extends Model { }
Project.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stylesNum: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deviationPercentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discountPercent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "project",
  }
);

Project.hasMany(Materials);
Materials.belongsTo(Project);

Project.hasMany(Work);
Work.belongsTo(Project);

Project.hasMany(General);
General.belongsTo(Project);

User.hasMany(Project);
Project.belongsTo(User);


export { Project, Materials, Work, General};
