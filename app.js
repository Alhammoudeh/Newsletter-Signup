const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post('/', function(req,res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  
});


app.listen(3000, function(){
  console.log("Server is running on port 3000....")
})
