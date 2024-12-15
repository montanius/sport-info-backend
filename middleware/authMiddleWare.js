const jwt = require('jsonwebtoken');
const TAJNI_KLJUC  = process.env.JWT_TAJNI_KLJUC;

const provjeriToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
return res.status(401).json({message: "Pristup odbijen, token nije kreiran."});
    }
    try{
const decoded = jwt.verify(token, TAJNI_KLJUC);
req.user = decoded;
next();
    }
    catch(error){
return res.status(403).json({message: "TOken nije validan."});
    };
};

module.exports = provjeriToken;