const jwt=require("jsonwebtoken");
require('dotenv').config();

function auth(req,res,next){
    const authHeader = req.headers["authorization"];
    const token =authHeader;
    if(token ==null) res.status(401).send({success:401, message:"Unauthorized user!"});

    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if (err) return res.status(403).send({success:403, message:"Session expired! try to login again."});
        req.userId = user.userId;
        next();
    });
}

module.exports = {
    auth,
}