const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    var city=req.body.cityName;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=cf86157524d7066886e1fd50c16c22a6&units=metric"
    
    https.get(url,function(response){

        response.on("data",function(data){
            //parses data into JSON format
            const weatherdata=JSON.parse(data);
            var temp=weatherdata.main.temp;
            var icon=weatherdata.weather[0].icon;
            var feels_like=weatherdata.main.feels_like;
            var imgURL=" http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>Temperature in "+city+" is "+temp+" C"+" but it feels like "+ feels_like+" C.</h1>");
            res.write("<img src="+imgURL+">");
            res.send();
        });
    });
})

app.listen(3001,function(){
    console.log("server on port 3001");
})


