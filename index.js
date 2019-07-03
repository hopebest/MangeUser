var express = require("express");
var app = express();
var port = 9000;

// set for ruser-router 
var userRouter = require("./routes/users-route");

//set for shortID 
var ids = require('short-id');

// set for pug
app.set('views', './views');
app.set('view engine', 'pug');

// set for req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
		});y

	}
);

// check uer-router and response respective

app.use("/users", userRouter);

app.listen(port, () => console.log("test userd"));