const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https=require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/signup.html" );
});

app.post("/", function(req,res)
{
    const firstName=req.body.fName;
    const middleName=req.body.mName;
    const lastName=req.body.lName;

    const data={
        members:[
            {
               email_address: lastName,
               status:"subscribed",
               merge_fields:{
                FNAME: firstName,
                LNAME: middleName
             }

            }
        ]

    };

    const jsonData= JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/18c5096077";

    const options = {
        method:"POST",
        auth: "harshit:a2d87ce43dc77d039e3f6552b45c85185-us17"
    }
   const request= https.request(url, options, function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();



    
   
});
app.post("/failure",function(req,res)
{
    res.redirect("/")
})
app.listen(3000,function(){
    console.log("server is running on port 3000");
});



// api key
// 2d87ce43dc77d039e3f6552b45c85185-us17


// id
// 18c5096077