const express = require('express');
const router = express.Router();
const user = require('../modules/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TAJNI_KLJUC = process.env.JWT_TAJNI_KLJUC;

router.post('/login', async (req, res) => {
    const {email, lozinka} = req.body;
    try{
const korisnikPostoji = await user.findOne({email});
if(!korisnikPostoji){
return res.status(400).json({message: "Korisnik nije pronađen u bazi"});
}
    const ispravnaLozinka =  await bcrypt.compare(lozinka, korisnikPostoji.lozinka);
    if(!ispravnaLozinka){
return res.status(400).json("Lozinka je pogrešna.");
    }

    const token = jwt.sign({
        id: korisnikPostoji._id, email: korisnikPostoji.email},
        TAJNI_KLJUC,
    {expiresIn : '1h'}
    );

    return res.status(201).json({
        message:"Korisnik je pronađen u bazi.",
        token:token
    });
    }
    catch(error){
return res.status(500).json({error: "Došlo je do greške pri prijavi."});
    }
});

module.exports = router;