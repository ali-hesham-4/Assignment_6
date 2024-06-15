import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "../models/user.model.js";

const postModel = sequelize.define("post" ,{
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false,
    },
})
userModel.hasMany(postModel);
postModel.belongsTo(userModel,{
    foreignKey:"author",
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
})

export default postModel