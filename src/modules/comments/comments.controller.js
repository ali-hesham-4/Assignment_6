import { where } from "sequelize";
import commentModel from "../../../db/models/comment.model.js";
import postModel from "../../../db/models/post.model.js";
import userModel from "../../../db/models/user.model.js";


// =========================== Creating  =============================

export const addComment = async (req , res , next)=>{
    const {content , postID , userID } = req.body
    const comment = await commentModel.create({ content , postID , userID})
    return res.status(200).json({msg:"comment has added successfully", comment})
} 

// =========================== Reading  =============================

export const getComment = async (req , res , next)=>{
    const comment = await commentModel.findAll()
    return res.status(200).json(comment)
} 


// =========================== updating  =============================

export const updateComment = async (req , res , next)=>{
    const {content , postID , userID } = req.body
    const {id} = req.params
    const comment = await commentModel.update({ content , postID , userID},{
        where:{
            id
        }
    })
    if(!comment[0]){
        return res.status(404).json({msg:"comment Not Found"})

    }
    return res.status(200).json({msg:"comment has updated successfully"})
}

// =========================== Deleting  =============================

export const deleteComment = async (req , res , next)=>{
    const {id} = req.params
    const comment = await commentModel.destroy({
        where:{
            id
        }
    })
    if(!comment){
        return res.status(404).json({msg:"comment Not Found"})

    }
    return res.status(200).json({msg:"comment has deleted successfully"})
}

/* =============================== get a spacific user with a spacific post and post's comments  ===============================*/


export const getCforUP = async (req , res , next)=>{
    const {userID , postID} = req.params
    const users = await userModel.findAll({
        attributes:{ exclude: ['password','postId' , 'userId'] },
        where:{id: userID},
        include: [{
            model: postModel,
            attributes:{ exclude: ['postId' , 'userId'] },
            where:{
                id: postID
            },
            include:[{
                model: commentModel,
                attributes:{ exclude: ['postId' , 'userId'] },
                where:{
                    postID
                }}]
        }]
    })
    return res.status(200).json(users)
} 