function auth(req,res,next){
    const token=req.headers.authorization;
    if(!token){
        return res.status(400).json({msg:"Access denied. Token Required"});
    }
    if(token!=="dev"){
        return res.status(401).json({msg:"Invalid Token"})
    }
    console.log("Successfully Verified Token")
    next();
}
module.exports=auth;