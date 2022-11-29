const { Router } = require('express');
const axios = require('axios');
const{ Country, Activity } = require('../db')
const { Op } = require ('sequelize');
const router = Router();

const getInfoApi = async() => {
    const apires = await axios.get('https://restcountries.com/v3/all')
    const data = apires.data.map(c =>{
        const country = {
            id: c.cca3,
            name: c.name.common,
            flag: c.flags[0],
            continent: c.continents[0],
            capital: c.capital != null ? c.capital[0] : "No data",
            subregion: c.subregion,
            area: c.area,
            population: c.population
        }
        return country
    })
    return data
};

const dbCountries = async () => {
    const countries = await Country.findAll();
    try{
        if(!countries.length){
            const arrCountries = await getInfoApi();
            await Country.bulkCreate(arrCountries)
        }
    } catch (err) { console.log(err) }
};


const loadCountries = async () => { await dbCountries() }
loadCountries();

router.get('/countries', async (req, res) => {
    const { name } = req.query;
    try {
        if(name) {//si llega un valor name por query
          console.log('Nombre ', name);
          let country = await Country.findAll({
            include: Activity, 
            where: {
                name: {
                  [Op.iLike]:name + "%",
                },  
              },
              order: [["name", "ASC"]],
            });
            if(country) console.log('Pais encontrado')
            if(!country) console.log('Pais no encontrado')
          if(country) return res.status(200).json(country);
          else return res.status(404).send("No se encontro el Pais");
        
        } else if (!name) {
          let country = await Country.findAll({
            include: Activity,
            through: { attributes:[] }
          });
          if(country) return res.status(200).json(country);
          else return res.status(404).send("No se encontro el Pais");
        }
    } catch (err){ console.log('!Error!', err) }  
});

router.get('/countries/:id', async (req, res) =>{
    const idPais = req.params.id.toUpperCase();
    try {// si viene un idPais por params
        // findByPk => asi obtengo un unico elemento
        let country = await Country.findByPk(idPais, {
            include: { model: Activity}
        });
        if (!country) return res.status(404).send("No se encontro pais")
        return res.status(200).json(country)
    } catch (err) { console.log(err) }
})

module.exports = router;





