// import { sequelize } from "../index.js";
// import { DataTypes, literal } from "sequelize";

// const Category = sequelize.define('category', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     category: DataTypes.STRING
// });

// const Subcategory = sequelize.define('subcategory', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: DataTypes.STRING
// });

// const Type = sequelize.define('type', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: DataTypes.STRING,
//     ballonsInCube: DataTypes.INTEGER
// });

// // Определение связей между моделями
// Category.hasMany(Subcategory);
// Subcategory.belongsTo(Category);

// Subcategory.hasMany(Type);
// Type.belongsTo(Subcategory);


// export default {
//     Category,
//     Subcategory,
//     Type
// };

import sequelize from "../db-mysql.js";
import { DataTypes, Model } from "sequelize";

class Stage extends Model {}
Stage.init(
  {
    stage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "stage",
  }
);

class Category extends Model {}
Category.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "category",
  }
);

class Subcategory extends Model {}
Subcategory.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "subcategory",
  }
);

class Type extends Model {}
Type.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ballonsInCube: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "type",
  }
);

// Определение связей между моделями
Stage.hasMany(Category);
Category.belongsTo(Stage);

Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);

Subcategory.hasMany(Type);
Type.belongsTo(Subcategory);

export { Stage ,Category, Subcategory, Type };
