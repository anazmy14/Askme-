const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


async function auth(req,res,next){
    try {
        const user = await jwt.verify(req.cookies.token , process.env.SECRET);
        req.user = user ;
        next();
    }
    catch (err) {
        res.status(403).send();
    }   
}

module.exports = auth;