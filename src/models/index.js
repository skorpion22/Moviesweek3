const Movie = require("./Movie");
const Genre = require("./Genre");
const Actor = require("./Actor");
const Director = require("./Director");

Movie.belongsToMany(Genre, { through: 'movieGenre'}) 
Genre.belongsToMany(Movie, { through: 'movieGenre'}) 

Movie.belongsToMany(Actor, { through: 'movieActor'}) 
Actor.belongsToMany(Movie, { through: 'movieActor'}) 

Movie.belongsToMany(Director, { through: 'movieDirector'}) 
Director.belongsToMany(Movie, { through: 'movieDirector'}) 