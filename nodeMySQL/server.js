var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');



app.set('view engine','ejs');
app.set('views', __dirname +'/views');
app.use(express.static(__dirname+'/public'));
var editSubject;
//serve index
app.get('/', function (req, res) {
  res.render('index')
})

//serve new post page
app.get('/new', function (req, res) {
  res.render('new')
})

//serve edit page
app.get('/edit', function (req, res) {
	var editingRowNum = req.query.rowNumber;
	con.query('SELECT * FROM users;',function(err, rows, fields) {
		if (err) throw err;
		editSubject = rows[editingRowNum].subject;
		res.render('edit',{oldsubject:editSubject,oldmessage:rows[editingRowNum].message})
	})
})
 
//edit a post 
app.get('/editPost',function(req,res){
	var queryText = "delete from users where subject = '" + editSubject +"'";
	con.query(queryText ,function(err,rows,fields){
		if (err) throw err;
	})
	insertRow(req,res);
	res.render('index')
});

//serve show posts page
app.get('/show', function (req, res) {
	con.query('Select * from users;',function(err, rows, fields) {
		if (err) throw err;
		res.render('show',{result:rows,status:''})
	})
})

//delete post
app.get('/delete',function(req,res){
	var queryText = "delete from users where subject = '"+req.query.subject+"';";
	console.log(queryText);
	con.query(queryText,function(err,rows,fields){
		if(err)throw err;
		else{
			console.log('Post Deleted Successfully');
		}
	})	
	con.query('Select * from users;',function(err, rows, fields) {
		if (err) throw err;
		res.render('show',{result:rows,status:'Row Successfully Deleted'})
	})
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//create connectrion
var con = mysql.createConnection({
	host:"localhost",
	user:"Ben",
	password:"",
	database:"users"
	
})
con.connect(function(err) {}); 

//insert row of data to database
function insertRow(req,res){
	var subject = req.query.subject;
	var message = req.query.message;
	var postdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
	var imageName = "'imageName'"//req.query.imageName
	var queryText="insert into users values('"+subject+"','"+message+"','"+postdate+"',"+0+')';
	con.query(queryText,function(err, rows, fields) {
		if (err) throw err;
		else console.log('Message Posted Successfully!');
    })
}			

//create new post
app.get('/newPost',function(req,res){
	insertRow(req,res);
	res.render('new')
})
//subject, message, postdate, imagename

app.listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
