const express = require('express');
const app = express();
//var url = require("url");

const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./apidocs/swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const rt_index = require('./routes/index');
const rt_product = require('./routes/product_router');
const rt_customer = require('./routes/customer');

mongoose.Promise = global.Promise;
if ( process.env.NODE_ENV !== 'test' )
{
  mongoose.connect('mongodb://localhost:27017/my_db1', { useNewUrlParser: true});
}
else {  /* Don't  do anything, in case of test, we will make connection from test_helper.js */ }


// Wiring up middleware, this must be  before calling any routes
// https://expressjs.com/en/guide/writing-middleware.html
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// Defining high level routes
app.use('/', rt_index);
app.use('/v1/product', rt_product);
app.use('/v1/customer', rt_customer);


//////// The default EXPRESS error handler ////////////
// Express Error Handling
// https://expressjs.com/en/guide/error-handling.html

// Wiring up error handler middleware, this must be after the routes
// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  var dev = false;

  if ( req.app.get('env') === 'development' )
  {
    dev = true;
    console.log ( "Running Development Mode");
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = ( dev === true ) ? err : {};

  res.status(err.status || 500);

  if ( dev === true )
  {
    console.log( err );
  }
  else
  {
    console.log( err.message );
  }

  // res.send('You Got Error, check console log !');
  res.send( {error: err.message} );

});


module.exports = app;