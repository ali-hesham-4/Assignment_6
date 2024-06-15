import { Association, where } from "sequelize";
import postModel from "../../../db/models/post.model.js";
import userModel from "../../../db/models/user.model.js";


// =========================== Creating  =============================

export const addPost = async (req , res , next)=>{
    const {title , content , author } = req.body
    const post = await postModel.create({ title , content , author})
    res.status(200).json({msg:"post has added successfully", post})
} 

// =========================== Reading  =============================

export const getPost = async (req , res , next)=>{
    const post = await postModel.findAll()
    res.status(200).json(post)
} 

// =========================== updating  =============================

export const updatePost = async (req , res , next)=>{
    const {title , content , author } = req.body
    const {user , id} = req.params
    const post = await postModel.update({ title , content , author},{
        where:{
            author: user ,
            id,
        }
    })
    if(!post[0]){
        return res.status(404).json({msg:"Post Not Found"})

    }
    res.status(200).json({msg:"post has updated successfully"})
}

// =========================== Deleting  =============================

export const deletepost = async (req , res , next)=>{
    const {user , id} = req.params
    const post = await postModel.destroy({
        where:{
            author: user,
            id,
        }
        })
    if(!post){
        return res.status(404).json({msg:"Post Not Found"})
    }
    res.status(200).json({msg:"post has deleted successfully"})
}


/* =============================== get a spacific post with the author  ===============================*/

export const getPostWithAuthor = async (req , res , next)=>{
    const {postID} = req.params
    const users = await postModel.findAll({
        where:{id: postID},
        attributes:{ exclude: ['postId' , 'userId'] },
        include: [{
            model: userModel,
            attributes:{ exclude: [ 'password'] },
        }]
    })
    return res.status(200).json(users)
}


