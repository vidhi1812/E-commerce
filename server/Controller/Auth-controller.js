const User = require('../Models/User-Model')
const Product = require('../Models/Product-model')
const bcrypt = require('bcryptjs')
const register = async (req, res) => {
    try{
        const {username, email, password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({msg: "Please fill in all fields"})
        }
        else if(await User.findOne({email})){
            return res.status(400).json({msg: "User already exists"})
        }
        const newUser = new User({username, email, password})
        await newUser.save()
        res.status(201).json({msg: "User created successfully"})
    }
    catch(err){
        res.status(400).json(err)
    }
}
const login = async (req, res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({msg: "Please fill in all fields"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg: "User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({msg: "Invalid credentials"})
        }
        const token = await user.generateAuthToken()
        res.status(200).json({message:"login suceesful",token})
    }
    catch(err){
        res.status(400).json(err)
    }
}
const validtoken = async (req, res) => {
    try{
    const {username,email,carts} = req.user
    res.status(200).json({username,email,carts})
    }
    catch(err){
        res.status(400).json(err)
    }
}
module.exports = {register, login, validtoken}