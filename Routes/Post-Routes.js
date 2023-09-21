import { Router } from "express";
import { CommentPost, DeletePost, GetAllPost, GetPostByID, UpdatedPost, createPost } from "../Controller/Post-Controller.js";

const PostRouter = Router();

PostRouter.get("/",GetAllPost)
PostRouter.post("/",createPost)
PostRouter.get("/:id",GetPostByID)
PostRouter.put("/:id",UpdatedPost)
PostRouter.put("/comment/:id",CommentPost)
PostRouter.delete("/:id",DeletePost)

export default PostRouter;