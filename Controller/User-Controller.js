// import { hashSync } from "bcryptjs";
import pkg from 'bcryptjs';
const { hashSync , compareSync } = pkg;
import User from "../Modal/User.js";

export const getallUsers = async(req,res)=>{

    let users;
    try {
        users = await User.find()
    } catch (error) {
      return  console.log(error);
    }

    if(!users){
        return res.status(500).json({message: 'Internal Server Error'})
    }

    return res.status(200).json({users})
}

export const SignUp = async(req,res)=>{

    const {name,email,password} = req.body;
    //if(!name || !email || !password) return res.status(400).json({message:"all fields are required"})

    if(!name || name.trim() === "" || !email || email.trim()=== "" || password.length < 6){
        return res.status(422).json({message: "All Fields Required!"})
    }

    const hashedpassword = hashSync(password);
    
    let users;
    try {
        users = new User({name,email,password: hashedpassword});
        await users.save()
    } catch (error) {
       return console.log(error);
    }

    if(!users){
       return res.status(500).json({message:"Internal Server Error"})
    }
   
    return res.status(201).json({users})
}


export const Login=async(req,res)=>{
    const {email,password} = req.body;
   

    if(!email || email.trim()=== "" || password.length < 6){
        return res.status(422).json({message: "All Fields Required!"})
    }

    let existingUser
    try {
       existingUser = await User.findOne({email})
    
    } catch (error) {
        return console.log(error)
    }

    if(!existingUser){
        return res.status(404).json({message:"No User Found"})
    }

    const isPasswordFound = compareSync(password,existingUser.password)

    if(!isPasswordFound){
      return  res.status(400).json({message:'Incorrect Password'})
    }

    return res.status(200).json({id: existingUser._id,name:existingUser.name , message:"Login Successful"})



}

export const getUserbyId = async(req,res)=>{

    const id = req.params.id
    let user;
    try {
        user = await User.findById(id).populate("post")
    } catch (error) {
        return console.log(error);
    }

    if(!user){
        return res.status(404).json({message:"NO USER FOUND!"})
    }

    return res.status(200).json({user})

}