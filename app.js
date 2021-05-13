const express=require("express");
const bodyParser=require("body-parser");
const request= require("request");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstname=req.body.fname;
  var lastname=req.body.lname;
  var email=req.body.emailid;

var data={
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }
  ]
};

var jsondata=JSON.stringify(data);


  var option={
    url: "https://us1.api.mailchimp.com/3.0/lists/97f38e3388",
    method:"POST",
    headers:{
      "Authorization": "Ujjwal512 cbf439c3e70c9c12c42eda8bccaaddbf-us1"
    },
    body:jsondata
  };


   request(option, function(error, response,body){
    if(error ){
      res.sendFile(__dirname+"/failure.html");
    }
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    } else{
      res.sendFile(__dirname+"/failure.html");
    }
   })
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT ||3000,function(){
  console.log("Server is running on port 3000");
});

//cbf439c3e70c9c12c42eda8bccaaddbf-us1

//unique id
//97f38e3388
