const express = require('express');
const router = express.Router();
const User = require('../modules/UserSchema');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { ime, prezime, status, email, lozinka } = req.body;
    try {
        const kriptovanaLozinka = await bcrypt.hash(lozinka, 10);         
        const noviKorisnik = new User({ ime, prezime, status, email, lozinka:kriptovanaLozinka });
        
        const korisnikPostoji = await User.findOne({ email });
                 console.log("Unešeni korisnik", korisnikPostoji, "postoji u bazi.");
        if (!korisnikPostoji) {
            await noviKorisnik.save();
            return res.status(201).json({ message: "Korisnik uspješn registrovan." });
        }
        else {
            return res.status(400).json({ message: "Korisnik sa  unešenim mailom već postoji!" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Došlo je do greške pri registraciji." });
    }
});

module.exports = router;