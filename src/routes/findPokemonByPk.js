const pokemons = require('../db/mock-pokemon')
const { Pokemon } = require('../db/sequelize')
module.exports = (app) => {
app.get('/api/pokemons/:id', (req,rest) => { 
    
    Pokemon.findByPk(req.params.id)
    const id = parseInt(req.params.id).then( pokemon =>{
        const message ='Un pokemon a bien été trouvé'
        res.json(success({message, data: pokemon}))
    })
        }
        )

   }