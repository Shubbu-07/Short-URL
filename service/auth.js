// service/auth.js
// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "$hubham@07#";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret);
}

function getUser(token){
    // return sessionIdToUserMap.get(id);
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        if(!token) return null;
    }
}

module.exports = {
    setUser, 
    getUser
}