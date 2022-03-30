import express from "express";


import { login, logout, signup, withRefreshToken } from "../controler/AuthenticationControler.js";
import { doLoginValidationHandler, LoginValidator } from "../middlewares/AuthValidator/authValidator.js";

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('Authentication');
})

userRouter.post('/login', login);
userRouter.post('/register', signup);
userRouter.post('/refresh-token', withRefreshToken)
userRouter.delete('/logout', logout);

export default userRouter;