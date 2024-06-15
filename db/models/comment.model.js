import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connectionDB.js";
import postModel from "./post.model.js";
import userModel from "./user.model.js";

const commentModel = sequelize.define("comment" ,{
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
})

commentModel.belongsTo(postModel)
postModel.hasMany(commentModel,{
    foreignKey:"postID",
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
});

commentModel.belongsTo(userModel)
userModel.hasMany(commentModel,{
    foreignKey:"userID",
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
});
export default commentModel