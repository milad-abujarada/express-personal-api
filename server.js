// require express and other modules
var express = require('express'),
    app = express();

var Vacation = require("./models/vacation");
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/
const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/personal-api");
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
    //woops_i_has_forgot_to_document_all_my_endpoints: false, ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    base_url: "https://protected-falls-36796.herokuapp.com/", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints."},
      {method: "GET", path: "/api/profile", description: "This endpoints will provide you with an idea of how awesome is me :)."}, 
      {method: "GET", path: "/api/showVacations", description: "Shows all countries I visited."},
      {method: "GET", path: "/api/vacationInfo/:id", description: "Shows information about a single vacation spot. Note: id is the name of the vacation spot."},
      {method: "GET", path: "/api/vacation", description: "Adds a vacation spot. Note: this endpoint calls POST /api/vacation endpoint after you submit the information you wanna save."}, 
      {method: "PUT", path: "/api/vacation/:id", description: "Updates a vacation information. Note: id is the name of the vacation spot"},
      {method: "GET", path: "/api/removeVacation", description: "Deletes a vacation information. Note: id is the name of the vacation spot. Note: this endpoint calls DELETE /api/removeVacation"}
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

app.get('/api/vacation', function(req, res){
  res.sendFile(__dirname + "/views/addVacation.html")
});

app.post('/api/vacation', function(req, res){
  let newVacation = new Vacation();
  newVacation.vacationPlace = req.body.vacationPlace;
  newVacation.description = req.body.description;
  newVacation.save(function(err){
    if(!err){
      res.sendFile(__dirname + "/views/success.html")
    };
  });
});

app.get('/api/showVacations', function(req, res){
  let vacations = new Vacation();
  vacations.collection.find({},{vacationPlace:1, _id:0, __v:0}).toArray(function(err, vacs){
    res.send(vacs);
  });
});

app.get('/api/vacationInfo/:id', function(req, res){
  let vacation = new Vacation();
  vacation.collection.findOne({vacationPlace:req.params.id}, {_id:0, __v:0}, function(err, result){
    res.send(result);
  });
});

app.get('/api/removeVacation', function(req, res){
  res.sendFile(__dirname + '/views/removevacation.html');
});

app.delete('/api/removeVacation', function(req, res){
  let vacation = new Vacation();
  vacation.collection.remove({vacationPlace:req.body.vacationPlace}, function(err){
      res.send("done");
  });
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
