const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

mailchimp.setConfig({
  apiKey: "[API_KEY]",
  server: "[SERVER]",
});

app.post('/', function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const listId= "[LIST_ID]";

  async function run(){
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    });

    res.sendFile(__dirname + "/success.html")
    console.log(
    `Successfully created an audience. The audience id is ${response.id}.`
  );

  }
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post('/failure', function(req,res){
  res.redirect('/');
});


app.listen(3000, function(){
  console.log("Server is running on port 3000....")
})
