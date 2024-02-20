var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;

const url = "mongodb+srv://vasawat:1234@authenticationtest.9popvhf.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url)
     .then(() => console.log('connection success!!'))
     .catch((err) => console.error(err));



// mongoose.connect("mongodb://127.0.0.1/userkeyDB", {useNewUrlParser: true});

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String
// });

// const User = new mongoose.model("User", userSchema);





const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  updated: { type: Date, default: Date.now },
});

const User = mongoose.model("angelausers", userSchema);


app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/login', function(req, res, next) {
  res.render('login');
});

app.get('/register', function(req, res, next) {
  res.render('register');
});

// app.post('/register', function(req, res, next) {
//   const newUser = new User ({
//     email: req.body.username,
//     password: req.body.password
//   });
//   newUser.save().then(()=>{
//     res.render('secrets');
//   });
// });

// app.post('/login', function(req, res, next) {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.findone({username}).exac()
//    .then((foundUser) => {
//       if(foundUser) {
//         if (foundUser.password === password) {
//           res.render('secrets');
//         }
//       }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });

// ----------------------------------------------------------------------------------------

app.post("/register", function(req, res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res.render("secrets");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}).exec()
      .then((foundUser) => {
          if(foundUser){
              if (foundUser.password === password){
                  res.render("secrets");
              }
          }   
      }).catch((err) => {
          console.log(err);
      }); 
});


// -------------------------------------------------------------------------------------





app.listen(3000, function () {
  console.log("this server run on port 3000");
});


