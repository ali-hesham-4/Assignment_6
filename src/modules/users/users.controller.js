import { where } from "sequelize"
import userModel from "../../../db/models/user.model.js"
import bcrypt, { hash } from 'bcrypt'

export const getUsers = async (req , res , next) =>{
    const users = await userModel.findAll()
    res.status(200).json({msg:"Done", users})
}


// =========================== Registeration  =============================
export const registeration = async (req , res , next) =>{
    let { userName , email ,password  } = req.body

    const salt = await bcrypt.genSalt()
    password =  await bcrypt.hash(password , salt)

    const users = await userModel.findOrCreate({
        where: {email , userName , password}
    })
    if(!users[1]){
        return res.status(400).json({msg:"This Email is already Exist"})
    }
    res.status(200).json({msg: "Added successfully" , user:users[0]})
}

// =========================== login  =============================

export const login = async (req , res , next) =>{
    const {  email ,password } = req.body
    let users = await userModel.findAll({where:{email : email}})

    if(!users.length){
        return res.status(404).json({msg:"Email enterd is incorrect"})
    }
        bcrypt.compare(password , users[0].password ,(err , response)=> {
        if(!response) {
            return res.status(404).json({msg:"Password entered is incorrect"})
        }
        if(response){
            const {userName,email, createdAt , updatedAt} = users[0]
            const user = {
                "userName": userName,
                "email": email,
                "createdAt": createdAt,
                "updatedAt": updatedAt
            }
            return res.status(200).json({msg:"Logged in Successfully" , user: user})
        }
        })
}

// =========================== logout  =============================

export const logout = async (req , res , next) =>{
    const {  email ,password } = req.body
    let users = await userModel.findAll({where:{email : email}})

    if(!users.length){
        return res.status(404).json({msg:"This user is not logged in"})
    }
        bcrypt.compare(password , users[0].password ,(err , response)=> {
        if(!response) {
            return res.status(404).json({msg:"This user is not logged in"})
        }
        if(response){
            const {userName,email, createdAt , updatedAt} = users[0]
            const user = {
                "userName": userName,
                "email": email,
                "createdAt": createdAt,
                "updatedAt": updatedAt
            }
            return res.status(200).json({msg:"Logged out Successfully"})
        }
        })
}