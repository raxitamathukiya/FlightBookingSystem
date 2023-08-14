const express=require('express')
const userRouter=express.Router()
require('dotenv').config()
const {userModel}=require('../Model/User.Model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
/**
* @swagger
* components:
*   schemas:
*       User:
*       type: object
*       properties:
*           id:
*               type: string
*               description: The auto-generated id of the user
*           name:
*               type: string
*               description: The user name
*           email:
*               type: string
*               description: The user email
*           password:
*               type: string
*               description: password the user
*/


/**
 * @swagger
 * tags:
 *  name: User
 *  description: All the API routes realeted the Users
 */
/**
 * @swagger
 * /api/register:
 *  post:
 *      summary: This will Add new user from DataBase
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Add New user 
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: This will check user exits or not
 *      tags: [User]
 *      responses:
 *          200:
 *              description: login successfully 
 *          400:
 *              description: Inccorect Request!!!!
 */
userRouter.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(hash){
                let data=new userModel({name,email,password:hash})
                data.save()
                res.status(201).send({message:"registration done!!!!"})
            }
        })

        
    } catch (error) {
        console.log(error)
    }
})

userRouter.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        let user= await userModel.findOne({email})
        if(!user){
            return res.send({message:"User not Exits"})
        }
        const hashpasswordmatch= await bcrypt.compare(password,user.password)
        if(!hashpasswordmatch){
            res.status(401).send({message:"Invalid Email and Password"})
        }
        const token= jwt.sign({email}, 'raxita');
        res.status(201).send({meassage:"login successfully","token":token})
    } catch (error) {
        console.log(error)
    }
})


module.exports={userRouter}