const { Sequelize} = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')

/**********connection à la base de données**************** */
const sequelize = new Sequelize(
    'pokedex',   // Nom de la base de donnée
    'username',      // identifiant utilisateur
    'password',          // Mot de passe
    {
        host: 'localhost',
        dialect : 'mariadb', // driver pour que sequelize interagisse avec la base de données
        dialectOptions:{
            timezone : 'Etc/GMT-2'
        },
        logging : false
    }
)
/********************************************* */

sequelize.authenticate()
.then( _ => console.log('La connexion a la base de données a bien été établie'))
.catch(error => console.log(` impossible de se connecter à la base de données : ${error}`))

const Pokemon = PokemonModel(sequelize,DataTypes)

const initDb=() =>{
    return sequelize.sync({force:true}) // sync tout les models sequelize avec la BD  et force:true permet d'effacer la table prec avant synch
    .then(_ =>{ 
    pokemons.map(pokemon =>{
    Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture, 
        types: pokemon.types.join()
    })
    .then( pokemon => console.log(pokemon.toJSON()))
    
    })
    console.log('La base de données "Pokedex" a bien été initialisée')
})
}

module.exports=
{
    initDb,Pokemon
}