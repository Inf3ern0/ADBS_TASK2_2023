const jwt = require ('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        console.log('Received token:', token); // Add this line to log the received token
        jwt.verify(token,"CONCODE")
        next();
    }
    catch(error)
    {
        res.status(401).json({
            message:"Invalid token"
        });
    }
};