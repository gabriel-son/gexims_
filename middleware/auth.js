const jwt = require('jsonwebtoken')
const redisClient = require('../models/redis')
const User = require('../models/user');

module.exports = async function (req, res, next) {
    const user = new User(req.body);
    //token provided by client
    const tokenProvidedByUser = req.header('x-authorization') || req.header('authorization');
    //if token was sent
    if (tokenProvidedByUser) {
        try {
            if (tokenProvidedByUser.startsWith('Bearer ')) {
                // Remove Bearer from string
                tokenProvidedByUser = tokenProvidedByUser.slice(7, tokenProvidedByUser.length);
              }
            //decoding token
            const decoded = jwt.verify(tokenProvidedByUser, process.env.TOKEN_SECRET_KEY);
            if (decoded) {
                console.log("token still valid");
                /*
                **valid token, giving client access to resource
                */
                req.token = tokenProvidedByUser;
                req.user = user;
                next();
            }
        } catch (err) {
            if(err.message === "jwt expired"){
                console.log("Token has expired")
                /*
               **expired token, generating new token for client using refresh token
               **if refresh doesn't exist in cache, ask user to login
               */
                const userEmail = req.body.email;
                const refreshToken = await redisClient.get(userEmail);
                if (refreshToken) {
                    await redisClient.del(userEmail);
                    const token = await user.generateAuthToken();
                    req.token = token;
                    req.user = user;
                    next();
                } else {
                    throw new Error({ message: 'Access denied.Please Login' })
                }
            }else{
            res.status(400).json({
                status: 'Error',
                message: err.message
            })
        }
        }
    } else {
        return res.status(400).json({
            status: 'Error',
            message: 'Access denied. No token provided'
        })
    }
}