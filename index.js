let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let path = require('path');
let Hotels = require('./public/scripts/models/hotel');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));

// connect with MONGOLAB
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

app
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

/* API REST HOTELS */

.get('/api', (req, res) => {
  res.send('api works');
})

.get('/api/hotels', (req, res) => {

  Hotels.find().then(hotels =>{
    res.status(200).json(hotels);
  })
  .catch(error =>{
    res.status(500).send(error);
  });
})

.post('/api/hotels', (req, res)=> {

  let maxId = 0;

  Hotels.find({}).
  limit(1).
  sort('-uniqueCode').
  select('uniqueCode').
  exec((err,hotels)=>{
    hotels.map((hotel)=> {
      maxId = hotel.uniqueCode;
    });
  }).then(()=>{
    let newHotel = new Hotels( req.body );
    newHotel.uniqueCode = maxId + 1;

    newHotel.save((err,hotel) => {
      if (err){
        res.status(500).send(error);
      }
      res.status(200).json(hotel);
    })
  })
})

.delete ('/api/hotels', (req, res)=> {

  Hotels.remove().then(hotels =>{
    res.status(200).json(hotels);
  })
  .catch(error =>{
    res.status(500).send(error);
  });
})

.get('/api/hotels/:id', (req, res)=>{

  Hotels.find({"uniqueCode": req.params.id},(error,hotels)=>{

    if(error){
      res.status(500).send(error)
    }
    res.status(200).json(hotels);
  });
})

.put('/api/hotels/:id', (req, res)=> {

  Hotels.find({"uniqueCode": req.params.id},(error,hotels)=>{

    if(error){
      res.status(500).send(error);
    }

    hotels.map((hotel)=>{
      hotel.name = req.body.name;
      hotel.stars = req.body.stars;
      hotel.image = req.body.image;
      hotel.price = req.body.price;
      hotel.save((error,hotel)=>{
          if(error){
          res.status(500).send(error);
        }
        res.status(200).json(hotel);
      });
    })
  });
})

.delete('/api/hotels/:id', (req, res)=> {

  Hotels.find({"uniqueCode": req.params.id},(error,hotels)=>{

    if(error){
      res.status(500).send(error);
    }

    hotels.map((hotel)=>{
      hotel.remove((error,hotel)=>{
        if(error){
          res.status(500).send(error);
        }
        res.status(200).json(hotel);
      })
    });
  });
});


app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
