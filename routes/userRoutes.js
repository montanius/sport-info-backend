const express = require('express');
const router = express.Router();
const User = require('../modules/UserSchema');

router.post('/register', async(req, res) => {
    const {ime, prezime, status, email, lozinka} = req.body;
    try{
const noviKorisnik = new User({ime, prezime, status, email, lozinka});
await noviKorisnik.save();
res.status(201).json({message:"Korisnik uspješn registrovan."});
    }
    catch(error){
res.status(500).json({error:"Došlo je do greške pri registraciji."});
    }
});

module.exports = router;