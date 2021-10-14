var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dockerstats = require('dockerstats');
var request = require('request');

const shell = require('shelljs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var ValidationJS =require ("./routes/validation.js");

var ChangeOwnershipJS =require ("./routes/changeOwnership.js");

var prediction =require ("./routes/predict.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


const schedule = require('node-schedule');

const job = schedule.scheduleJob('*/10 * * * * *', function(){
    dockerstats.dockerContainerStats(function(data) {
    //console.log('Docker Containers');
    let i;
    for (i = 0; i < data.length; i++) {
      //console.log("Memory " + data[i].memPercent + " id " +  data[i].id);
      //console.log("Cpu "+ data[i].cpuPercent+ " id " +  data[i].id);
      let memlimit =  data[i].memLimit;
      let memPercent =  data[i].memPercent;
      let cpuPercent =  data[i].cpuPercent;
      let id =  data[i].id;
      request.post(
        'http://127.0.0.1:5000/predict',
        { json: 
          {
            "cpu" : {
                "peer 0": cpuPercent,
            },
            "memory" : {
                "peer 0" : memPercent,
            }
          }
        },
        async function (error, response, body) {
          //console.log(">>>>>> 1 >>>>>>>> " + memPercent);
            if (!error && response.statusCode == 200) {
              //res.send(body);
          //console.log(">>>>>> 2 >>>>>>>> " + memPercent);

              if(body["action"]  == "up"){
                //console.log(body);
                //console.log((memlimit +52428800)/(1024*1024));
                
                shell.exec(`./test.sh  ${(memlimit + 52428800)/(1024*1024)}m ${id}`)
              }
              else if(body["action"]  == "down") {
                //console.log(body);
                //console.log((memlimit +52428800)/(1024*1024));
                shell.exec(`./test.sh  ${(memlimit - 52428800)/(1024*1024)}m ${id}`)
                //shell.exec('./test.sh '+ (memlimit -52428800)/(1024*1024) + 'm ' + id )
              }
                //console.log(body);
            }
        }
      );
    }
    //res.send(data);
  });
  //console.log('The answer to life, the universe, and everything!');
});


app.get('/queryCar', function(req, res){

  ValidationJS.queryCar(res);
});

app.get('/queryCar2', function(req, res){

  ValidationJS.queryCar2(res);
});

app.get('/createCar', function(req, res){

  ValidationJS.createCar(res);
});

app.get('/changeOwnership', function(req, res){

  ChangeOwnershipJS.changeOwnership(res);
});

app.get('/createCar2', function(req, res){

  ValidationJS.createCar2(res);
});

app.get('/predict', function(req, res){

  request.post(
      'http://127.0.0.1:5000/predict',
      { json: 
        {
          "cpu" : {
              "peer 0": 10,
              "peer 1": 10,
              "peer 2": 30
          },
          "memory" : {
              "peer 0" : 10,
              "peer 1": 10,
              "peer 2": 50
          }
        }
      },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
            res.send(body);
            if(body["action"]  == "up"){
              console.log(body);
              shell.exec('./test.sh')
            }
             // console.log(body);
          }
      }
  );
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
