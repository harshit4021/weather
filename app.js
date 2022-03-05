const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
})
app.post("/",function(req,res){
const city =  req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=529c0cc9632687fe1f0eccd172976615&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp = weatherData.main.temp;
      const wc = weatherData.weather[0].description;
      const ic = weatherData.weather[0].icon;
      const imageurl=" http://openweathermap.org/img/wn/"+ic+"@2x.png"
      res.write("<h1>the temperature is " + temp +  " degrees</h1>");
      res.write("<h3>weather condition is " + wc +  "</h3>");
      res.write("<img src="+imageurl+">");
      res.send();
    })
  })
})
app.listen(3000,function(){
  console.log("server started on port 3000");
})
