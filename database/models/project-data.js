import User from "./user-model.js"
import sequelize from "../db-mysql.js";
import { DataTypes, Model } from "sequelize";

// class Menu extends Model {}
// Menu.init(
//   {
//     category: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     subcategory: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     type: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     quantity: {
//       type: DataTypes.DOUBLE,
//       allowNull: true,
//     },
//     price: {
//       type: DataTypes.DOUBLE,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     modelName: "menu",
//   }
// );

// class ProjectStage extends Model {}
// ProjectStage.init(
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "projectStage",

//   }
// );
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
      allowNull: false,
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

// Project.hasMany(ProjectStage);
// ProjectStage.belongsTo(Project);
Project.hasMany(Materials);
Materials.belongsTo(Project);

Project.hasMany(Work);
Work.belongsTo(Project);

Project.hasMany(General);
General.belongsTo(Project);

// ProjectStage.hasMany(Menu);
// Menu.belongsTo(ProjectStage);

// Materials.hasMany(Menu);
// Menu.belongsTo(Materials);

// Work.hasMany(Menu);
// Menu.belongsTo(Work);

// General.hasMany(Menu);
// Menu.belongsTo(General);

User.hasMany(Project);
Project.belongsTo(User);


export { Project, /*ProjectStage,*/ Materials, Work, General/*, Menu */ };
