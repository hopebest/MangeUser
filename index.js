var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var port = 9090;
// set fot mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-demo',  {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
//dotenv
//set for cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());
// set for ruser-router 
var userRouter = require("./routes/users-route");

// set for login-router
var loginRouter = require("./routes/login-route.js");

//set for user api
var apiUser = require("./api/routes/user-api.js");

var loginMiddleware = require("./middleware/login-middleware");

//set for shortID 
var ids = require('short-id');

// set for pug
app.set('views', './views');
app.set('view engine', 'pug');

// set for req.body
// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencodedq
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
	
// set for lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();

// send respond for see / request
app.get("/", (req, res) => 
    {
        res.render('view', {
            name: "Tuan",
            age: "18"
        });

    }
);

// check uer-router and response respective
app.use("/users", loginMiddleware.requireLogin, userRouter);
app.use("/auth", loginRouter);
app.use("/api/users", apiUser);	

app.listen(port, () => console.log("test userd"));