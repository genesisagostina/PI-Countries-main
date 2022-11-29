const { Router } = require('express');
const{ Activity, Country } = require('../db');
const { Op } = require ('sequelize');
const router = Router()

router.get('/activities', async (req, res) => {
    const acts = await Activity.findAll();
    if(!acts.length) return res.status(404).json("No se encontraron activdades");
    else return res.status(200).json(acts)
});

router.post('/activities', async (req,res) =>{
    const {name, difficulty, duration, season, countries} = req.body
    console.log(req.body)
    try{
        if(name && difficulty && duration && season && countries){
            const act = await Activity.create({
                name,
                difficulty,
                duration,
                season
            })
            countries.forEach(async (id) => {
                const country = await Country.findOne({
                    where: {id: {[Op.iLike]:`%${id}%`}}
                        })
                await country?.addActivity(act);
            })
            return res.status(201).send('Se creo la actividad correctamente') 
        }
    } catch (err) { console.log(err) }
})

module.exports = router;

