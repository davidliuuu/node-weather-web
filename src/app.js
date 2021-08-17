const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000 ;
// Define paths for Express config  自定義路徑於Express框架配置
const publicDirectoryPath = path.join(__dirname , '../public');
const viewsPath = path.join(__dirname , '../templates/views')  //設定文件路徑
const partialsPath = path.join(__dirname , '../templates/partials');

// Setup handlebars engine and views location //設定 handlebars engine and views 的位置
app.set('view engine' , 'hbs'); // 設定 hbs 為默認的 可使用res.render做使用
app.set('views' , viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve 設定靜態目錄來提供服務
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'David Liu'
    });        // res.render(文件名 , 要傳送給予使用的參數)
});

app.get('/about', (req,res) => {
    res.render('about' , {
        title: 'About me',
        name: 'David Liu'
    });    // res.render(文件名 , 要傳送給予使用的參數)
});

app.get('/help', (req,res) => {
    res.render('help' , {
        title: 'Help',
        helpText:'This is some helpful text.',
        name: 'David Liu'
    });    // res.render(文件名 , 要傳送給予使用的參數)
});
// app.com/weather
app.get('/weather' , (req,res)=>{
    if(!req.query.address){  
        return res.send({
            error: 'You must provide a address'
        });    // No address? Send back an error message
    }

    geocode(req.query.address , (error , { latitude , longitude , location} = {}) => {
    if(error){
        return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({error});
        }
        res.send({ 
        forecast: forecastData,
        location: location,           
        address : req.query.address    // return the provided address
        });
    });
    });
    
});

app.get('/help/*' , (req , res) =>{
    res.render('404' , {
        title: '404',
        name: 'David Liu',
        errormsg:'Help article not found'
    });
});

app.get('*' , (req , res) =>{
    res.render('404' , {
        title: '404',
        name: 'David Liu',
        errormsg:'Page not found'    
    });
});

app.listen(port , ()=>{
    console.log("Server is up on port " + port);
});

