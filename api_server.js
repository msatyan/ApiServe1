const app = require('./app');



var port = process.env.PORT || 3000;
console.log("Static Page:");
console.log(`http://localhost:${port}/`);

console.log();
console.log("API Access:");
console.log(`http://localhost:${port}/v1/order`);
console.log(`http://localhost:${port}/v1/product`);
console.log(`http://localhost:${port}/v1/order`);
console.log();

// console.log(`http://localhost:${port}/api-docs`);
// console.log();

//module.exports = app;
app.listen(port);


