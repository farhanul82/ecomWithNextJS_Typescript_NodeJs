import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import res from 'express/lib/response.js'


// Register User
export const signup = async(req, res) => {
    try {
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        const result = await newUser.save();
        console.log(result)

        const userObj = {
            userId: result._id,
            username: result.username,
            email: result.email,
        }

        // generate token
        const accessToken = jwt.sign(userObj, process.env.JWT_SECRET_FOR_ACCESS, {
            expiresIn: '2h',
        })

        const refreshToken = jwt.sign(userObj, process.env.JWT_SECRET_FOR_REFRESH, {
            expiresIn: '1y',
        })
        res.status(200).json({
            message: `${result.username} was added successfully!`,
            token: {
                accessToken,
                refreshToken
            },
            user: result
        });
    } catch (error) {
        res.status(500).json({
            errors: "Unknown error occurred!",
        })
    }

}


// Login User
export const login = async(req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (user && user._id) {
            console.log(req.body.password);
            const isValidPassword = await bcrypt.compare(req.body.password, user.password)
            console.log(isValidPassword);
            if (isValidPassword) {
                // prepare the user object to generate token
                const userObject = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                };

                // generate token
                const accessToken = jwt.sign(userObject, process.env.JWT_SECRET_FOR_ACCESS, {
                    expiresIn: '2h',
                })

                const refreshToken = jwt.sign(userObject, process.env.JWT_SECRET_FOR_REFRESH, {
                    expiresIn: '1y',
                })

                // set logged in user local identifier
                res.locals.loggedInUser = { userObject, accessToken, refreshToken };

                // send response
                res.status(200).send({ userObject, accessToken, refreshToken })
            } else {
                throw createError("Login failed! Please try again.");
            }
        } else {
            throw createError("Login failed! Please try again.");
        }
    } catch (error) {
        next(error)
    }
}

// generate access token with refresh token
export const withRefreshToken = (req, res, next) => {
    try {
        const { refresh_Token } = req.body
        const verifyRefreshToken = jwt.verify(refresh_Token, process.env.JWT_SECRET_FOR_REFRESH, (err, payload) => {
            if (err) {
                throw createError.Unauthorized()
            }
            return payload

        })

        // generate token
        const accessToken = jwt.sign(verifyRefreshToken, process.env.JWT_SECRET_FOR_ACCESS)

        const refreshToken = jwt.sign(verifyRefreshToken, process.env.JWT_SECRET_FOR_REFRESH)

        res.status(200).send({ accessToken, refreshToken })
    } catch (error) {
        console.log(error)
    }
}



// Logout
export const logout = () => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out");
}