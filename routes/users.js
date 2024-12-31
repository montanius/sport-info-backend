const express = require('express');
const router = express.Router();
const user = require('../schema/UserSchema');
const provjeriToken = require('../middleware/authMiddleWare');

router.get('/', async (req, res) => {
    try{
    const users = await user.find();
return res.status(201).json({data:users});    
    }
    catch(error){
return res.status(500).json("Došlo je do greške u aplikaciji.");
}
    });

    router.get('/me', provjeriToken, async (req, res) => {
try{
const korisnik = await user.findById(req.user.id).select('-lozinka');
if(!korisnik){
return res.status(404).json({ message : 'Korisnik nije pronađen'});
}
return res.status(200).json(korisnik);
}
catch(error){
return res.status(500).json({ message : 'Došlo je do greške'});
}
    });

    router.patch('/update', provjeriToken, async (req, res) => {
        const userId = req.user.id;
const [field, value] = Object.entries(req.body)[0];

 try{
const updateData = {[field]: value};

const result = await  user.updateOne({_id: userId}, {$set: updateData});

if(result.modifiedCount === 0){
return res.status(400).json({message: 'Podatak nije izmijenjen ili korisnik nije pronađen.'});
}

    return res.status(200).json({message: 'Podatak je ažuriran.'});
 }
 catch(error){
return res.status(500).json({message: 'Greška pri ažuriranju podataka.', error:error.message});
 }
    });
    
module.exports = router;