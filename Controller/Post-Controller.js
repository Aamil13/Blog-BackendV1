import mongoose from "mongoose";
import Post from "../Modal/Post.js"
import User from "../Modal/User.js";

export const GetAllPost = async(req,res)=>{
        let posts;

        try {
            posts = await Post.find()
        } catch (error) {
           return console.log(error);
        }

        if(!posts){
          return  res.status(500).json({message:"Unexpected Error Occured"})
        }

        return res.status(200).json({posts})
}

export const createPost = async(req,res)=>{

    const {title,description,image,location,date,user}= req.body;

    if(!title || title.trim() === '' ||!description || description.trim() === '' 
    || !image || image.trim() === '' || !location || location.trim() === '' ||
    !date || !user){
       return res.status(422).json({message:"All Fields Required"})
    }

    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error);
    }

    if(!existingUser){
        return res.status(404).json({message: "User not found"})
    }

    let post;
    try {
        post = new Post({
            title,
            description,
            image,
            location,
            date: new Date(`${date}`),
            user,
        })

        const session = await mongoose.startSession()
       session.startTransaction();
       existingUser.post.push(post);
       await existingUser.save({session})
        post = await post.save({session})
        session.commitTransaction()
    } catch (error) {
        return console.log(error);
    }

    if(!post){
      return  res.status(500).json({message: 'Unexpected Error Occured'})
    }

    return res.status(201).json({post});
}

export const GetPostByID= async(req,res)=>{
    const id = req.params.id;

    let post;
    try {
        post = await Post.findById( id)
    } catch (error) {
        return console.log(error);
    }
    if(!post){
        return res.status(404).json({message:"No Post Found"})
    }

    return res.status(200).json({post})
}

export const UpdatedPost = async(req,res)=>{
    const id = req.params.id;
    const {title,description,image,location}= req.body;

    if(!title || title.trim() === '' ||!description || description.trim() === '' 
    || !image || image.trim() === '' || !location || location.trim() === '')
    {
       return res.status(422).json({message:"All Fields Required"})
    }

    let post;
    try {
        post = await Post.findByIdAndUpdate(id,{
            title,description,image,location
        })
    } catch (error) {
       return console.log(error);
    }

    if(!post){
      return  res.status(500).json({message:"Unable to Update"})
    }

    return res.status(200).json({message:"Updated Successfully"})
}


export const DeletePost = async(req,res)=>{
    const id = req.params.id;

    let post;
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        post = await Post.findById(id).populate("user") 
        post.user.post.pull(post)
        await post.user.save({session})
        post = await Post.findByIdAndRemove(id)
        session.commitTransaction()
    } catch (error) {
        return console.log(error);
    }

    if(!post){
        return res.status(500).json({message: "Failed to Delete"})
    }

        return res.status(200).json({message:"Successfully Deleted"})

}