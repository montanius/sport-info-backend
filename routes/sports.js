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
    const {name, status, type} = req.query;
    const query = {};
        if  (name) query.name = {$regex: name, $options: 'i'};
    if (status) query.status = status;
    if (type) query.type = type;
    query.isDeleted = { $ne : true};
try{
const sports = await sport.find(query).select('_id name');
return res.status(200).json(sports);
}
catch(error){
return res.status(500).json(error.message);
}
});

router.get('/sport', async (req, res) => {
    const {_id} = req.query;
            try{
const sports = await sport.findOne({_id});
return res.status(200).json(sports);
}
catch(error){
return res.status(500).json(error.message);
}
});

router.patch("/:id", async (req, res) => {
        const {id} = req.params;
            const updatedData = req.body;
                try{
    const updatedSport = await sport.findByIdAndUpdate(id, updatedData, { new : true});
   console.log("Ažurirani podaci su:", updatedSport);
    if(!updatedSport){
return res.status(404).json({message: `Sport nije pronađen.`});
    }
    res.status(200).json(updatedSport);
}
catch(error){
res.status(500).json({message : `Došlo je do greške  pri ažuriranju podataka.`});
}
});

module.exports = router;