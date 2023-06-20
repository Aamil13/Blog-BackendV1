import { Router } from "express";
import { getallUsers, getUserbyId, Login, SignUp } from "../Controller/User-Controller.js";

const userRouter = Router() ;

userRouter.get("/",getallUsers);
userRouter.get("/:id",getUserbyId);
userRouter.post("/signup",SignUp);
userRouter.post("/login",Login);




export default userRouter;