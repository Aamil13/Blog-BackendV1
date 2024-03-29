import mongoose, { Schema,model } from "mongoose";

const PostSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment:[]

})

export default model("Post",PostSchema)