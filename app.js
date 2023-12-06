
const express = require ('express')
const morgan = require('morgan')
 const favicon =require('serve-favicon')
let pokemons = require('./src/db/mock-pokemon.js')
const sequelize = require('./src/db/sequelize')
const { success, getUniqueId } = require('./helper.js')
const bodyParser = require('body-parser') 
const PokemonModel = require('./src/models/pokemon')
const app = express()
const port = 3000

sequelize.initDb()
//ici on ajoute les endpoints
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/updatePokemon')(app)
require('/src/routes/deletePokemon')(app)

/**********connection à la base de données**************** */
/* const sequelize = new Sequelize(
    'pokedex',   // Nom de la base de donnée
    'root',      // identifiant utilisateur
    '',          // Mot de passe
    {
        host: 'localhost',
        dialect : 'mariadb', // driver pour que sequelize inter agisse avec la base de données
        dialectOptions:{
            timezone : 'Etc/GMT-2'
        },
        logging : false
    }
) */
/********************************************* */

/* sequelize.authenticate()
.then( _ => console.log('La connexion a la base de données a bien été établie'))
.catch(error => console.log(` impossible de se connecter à la base de données : ${error}`))
 */
//const Pokemon = PokemonModel(sequelize,DataTypes)
/* sequelize.sync({force:true}) // sync tout les models sequelize avec la BD  et force:true permet d'effacer la table prec avant synch
.then(_ => console.log('La base de données "Pokedex" a bien été synchronisée'))
pokemons.map(pokemon =>{
Pokemon.create({
    name: pokemon.name,
    hp: pokemon.hp,
    cp: pokemon.cp,
    picture: pokemon.picture, 
    types: pokemon.types.join()
})
.then( pokemon => console.log(pokemon.toJSON()))

}) */
//.catch(error => console.log(`Synchronisation Failed : ${error}`))





/************Outil de Suivi des connections à l'application************************* */

const logger =(req, res, next) =>{
    console.log(`URL : ${req.url}`)
    next()
}
/****************************************** */


app.use(logger)
    .use(morgan('dev'))
    .use(favicon(__dirname+ '/favicon.ico'))
    .use (bodyParser.json())

/* app.use(function(err, req, res ,next){
    console.error(err);
    res.send('erreur');
    }); */



app.listen(port,()=>{console.log(` Server is running at http://localhost:${port}`)})
