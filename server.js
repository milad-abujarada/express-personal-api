// require express and other modules
var express = require('express'),
    app = express();


// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    //woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    base_url: "https://protected-falls-36796.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints."},
      {method: "GET", path: "/api/profile", description: "This endpoints will provide you with an idea of how awesome is me :)."}, // CHANGE ME
      {method: "GET", path: "/api/showVacations", description: "Shows all countries I visited."},
      {method: "GET", path: "/api/vacationInfo/:id", description: "Shows information about a single vacation spot. Note: is is the name of the vacation spot."},
      {method: "POST", path: "/api/vacation", description: "Adds a vacation spot."}, // CHANGE ME
      {method: "PUT", path: "/api/vacation/:id", description: "Updates a vacation information. Note: is is the name of the vacation spot"},
      {method: "DELETE", path: "/api/vacation/:id", description: "Deletes a vacation information. Note: is is the name of the vacation spot"}
    ]
  })
});

app.get('/api/profile', function(req, res){
  let Milad = {
    name: "Milad Abujarada",
    github_link: "https://github.com/milad-abujarada",
    github_profile_image: "https://avatars2.githubusercontent.com/u/33275486?s=400&u=e23c60cb7249cfdf19f273152b89517b2a3d5dac&v=4",
    current_city: "Denver",
    pets: [
      {name: "Nemro", type: "cat"},
      {name: "Misha", type: "cat"}
    ]
  };
  res.json(Milad)
})

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
