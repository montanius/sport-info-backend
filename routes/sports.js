const express = require('express');
const router = express.Router();
const sport = require('../schema/SportSchema');
const provjeriToken = require('../middleware/authMiddleWare');

router.post('/addsport', provjeriToken,  async (req, res) => {
    const {name, status, type, discipline, category} = req.body;
    try {
        const noviSport = new sport({name, status, type, discipline, category});        
        const sportPostoji = await sport.findOne({name});
                                 console.log("Sport sa imenom ", sportPostoji, "postoji u bazi.");
        if (!sportPostoji) {
            await noviSport.save();
            return res.status(201).json({ message: "Sport je uspješno upisan." });
        }
        else {
            return res.status(400).json({ message: "Sport sa  unešenim imenom već postoji!" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Došlo je do greške pri registraciji." });
    }
});

router.get('/', async (req, res) => {
try{
const sports = await sport.find();
return res.status(200).json(sports);
}
catch(error){
return res.status(500).json(error.message);
}
});

module.exports = router;