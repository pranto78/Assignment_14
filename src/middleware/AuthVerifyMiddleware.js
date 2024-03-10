
var jwt = require('jsonwebtoken');


module.exports=(req,res,next)=>{

    let token=req.headers['token-key']
    jwt.verify(token,"SecretKey12345",function (err,decoded) {
        if (err){
            res.status(401).json({status:"Unauthorized"})
        }
        else {
            // Get User Name From Decoded Token & Add with Req Header
            let username=decoded['data']['UserName'];
            req.headers.username=username

            next();
        }
    })
}