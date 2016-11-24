// primero cargamos las dependencias
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var random_maker = require('randomstring');
var fs = require('fs');

// datos
var data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
/*console.log(data.user);
*/
// configurar bodyparser para obtener variables posts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
var router = express.Router();

// middleware
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

app.use(express.static('public'));

// se listan las rutas
router.get('/movies', function(req, res) {
    res.json({'movies': data.movies});   
});

router.get('/user', function(req, res) {
	res.json(data.user);
});

// se guarda ana nueva pelicula
router.post('/movies', function(request, response) {
	/*var new_movie = {
		id: random_maker.generate({charset: 'alphabetic', length: 12}),
		title: request.body.title,
		year: request.body.year,
		genre: request.body.genre
	}
	movies.push(new_movie);
	response.json({id: new_movie.id});*/
	data.movies.push(request.body.movie);
	fs.writeFileSync('db.json', JSON.stringify(data));
	response.json({status: 'ok'});
});

/*router.delete('movies/:id', function(request, response) {
	var movie_id = request.params.id;
	for(var i=0 ; i<movies.length ; ++i) {
		if (movies[i].id == movie_id) {
			movies.splice(i, 1);
			response.json({});
		}
	}
	response.statusCode = 204;
	response.json({});
});

router.put('movies/:id', function(request, response) {
	var movie_id = request.params.id;
	for(var i=0 ; i<movies.length ; ++i) {
		if (movies[i].id == movie_id) {
			movies[i].title = request.body.title;
			movies[i].year = request.body.year;
			movies[i].genre = request.body.genre;
			response.json({});
		}
	}
	response.statusCode = 204;
	response.json({});
});*/


// Se registran las rutas
app.use('/api', router);

// Se inicializa el servidor
app.listen(port);
console.log('Inicializado el servidor en el puerto ' + port);