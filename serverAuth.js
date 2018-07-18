const
    jwt = require('jsonwebtoken'),
    User = require('./models/User.js'),
    { JWT_SECRET } = process.env

function signToken(user){
    const userData = user.toObject()
    delete userData.password
    return jwt.sign(userData, JWT_SECRET)
}

function verifyToken(req, res, next){
    //get token from the headers of the incoming request
    const token = req.get('token')
    //if no token deny access
    if(!token) return res.json({message: "Error", error: "No token provided."})
    //other wise try to verify the token
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        // if error, then deny access:
        if(err) return res.json({message: "Error", error: "Invalid token."})
        // Check to ensure that the user still exists by searcing by id
        User.findById(decodedData._id, (err, user) =>{
            // if no user, deny access
            if(!user) return res.json({message: "Error", error: "Inavlid Token (no such user)."})
            // Add User to request object as the current user
            req.user = user
            // Go on to process route:
            next()
        })
    })
}

module.exports = {
    signToken,
    verifyToken
}