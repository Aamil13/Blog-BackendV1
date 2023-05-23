import { Router } from "express";
import { getallUsers, Login, SignUp } from "../Controller/User-Controller.js";

const userRouter = Router() ;

userRouter.get("/",getallUsers);
userRouter.post("/signup",SignUp);
userRouter.post("/login",Login);




export default userRouter;