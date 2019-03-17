## REST API Service
This REST API framework is designed to suit highly scalable modern applications. It has a modular architecture with two fold routing to make the code simple even for very large projects. It has facility to enforce schema validation to ensure data integrity before storing it in the database. The error handling can be done locally at every API level and (or) globally using middleware. The unit tests are integrated with mocha JavaScript testing framework and integration test can be done with CurL. This framework has the following major technology stack.
- Node.js
- Express
- MongoDB Database
- Mongoose driver
- Mocha JavaScript unit testing
- ES6 Syntax


### Project directory structures
```bash
# project root directory
api_server.js : The node.js server application.
app.js : The main Express application

##### this framework has two fold routing
# ./routes folder
High level routing modules

# ./controllers
API level routing definitions
database access logic

# ./models
Data Model Definitions

# ./test
All unit tests root directory

# ./test/controllers
Test for each API defined in the controllers

# ./public
API Documentation
```


#### Get the demo source code
```bash
# cd /work
cd c:\work

git clone https://github.com/msatyan/ApiServe1.git

# fetch all dependent packages
# cd /work/ApiServe1
cd c:\work\ApiServe1
npm install
```


### Starting the REST API service
```bash
# cd /work/ApiServe1
cd c:\work\ApiServe1

# Make sure the mongodb is up and running
# Edit app.js to update the mongodb connection information
npm start

# or
# node api_server.js
```

### Run unit testing.
Currently the unit test is configured to run on watch mode with the help of nodemon. The nodemon watchout for source code change and automatically restart the test.
```bash
# Edit test/test_helper.js to update the mongodb connection information used for test.
# cd /work/ApiServe1
cd c:\work\ApiServe1

npm  run test
```




```bash
# Currently only the product REST API has data access facility implemented.
# The remaining REST API will give you dummy response without doing database access.

# REST API implementations
http://localhost:3000/v1/product


# Static page serving for documentation
http://localhost:3000/
```



### Test REST APIs with curl
You may use Visual Studio Code with REST Client plugin for convenient way of invoking CURL command from a script with HTTP extension.  
- [REST Client plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)



## Populate few records in the database.
```bash

# POST record-1
curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{
  "name" : "CD",
  "description" : "Very good CD",
  "price": 10.24
}
' "http://localhost:3000/v1/product"

# POST record-2
curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{
  "name" : "DVD",
  "description" : "Very good DVD",
  "price": 12.56
}
' "http://localhost:3000/v1/product"


# POST record-3
curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{
  "name" : "BR",
  "description" : "Very good BR",
  "price": 15.80
}
' "http://localhost:3000/v1/product"

```

### Select records
```bash
# GET a list of records
curl    -X GET http://localhost:3000/v1/product
curl    -X GET http://localhost:3000/v1/product?minprice=11&maxprice=14

# Select a single record (the above command should list the ID)
curl    -X GET  http://localhost:3000/v1/product/< ID of the record you plan to select>
# eg:
curl    -X GET  http://localhost:3000/v1/product/5c8d8e0974a64030b4bb60bf

# TODO: with basic auth
# curl -u dbuser1:MyPassword -X GET  http://localhost:3000/v1/product
```

### Delete
```bash
#DELETE
curl    -X DELETE  http://localhost:3000/v1/product/< ID of the record >
# eg:
curl    -X DELETE  http://localhost:3000/v1/product/5c8d8e0974a64030b4bb60bf
```



### The CURD design pattern followed
This snapshot has CURD design pattern used and the most frequent used HTTP status codes.

#### POST Create
```
Entire Collection:
201 (Created), 'Location' header with link to /product/{id} containing new ID.
Specific Item:
404 (Not Found), 409 (Conflict) if resource already exists.
```

#### GET Read
```
Entire Collection:
200 (OK), list of products. Use pagination, sorting and filtering to navigate big lists.
Specific Item:
200 (OK), single product. 404 (Not Found), if ID not found or invalid.
```

#### PUT Update/Replace
```
Entire Collection:
404 (Not Found), unless you want to update/replace every resource in the entire collection.
Specific Item:
200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
```

#### PATCH Update/Modify
```
Entire Collection:
404 (Not Found), unless you want to modify the collection itself.
Specific Item:
200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
```

#### DELETE
```
Entire Collection:
404 (Not Found), unless you want to delete the whole collection—not often desirable.
Specific Item:
200 (OK). 404 (Not Found), if ID not found or invalid.
```


---
### [HTTP Status Code Registry](https://www.ietf.org/assignments/http-status-codes/http-status-codes.xml)
Here are some snippet of Hypertext Transfer Protocol (HTTP) status code.

### 1xx Informational
- 100 Continue
- 101 Switching Protocols
- 102 Processing (WebDAV)

### 2xx Success
- 200 OK
- 201 Created
- 202 Accepted
- 203 Non-Authoritative Information
- 204 No Content
- 205 Reset Content
- 206 Partial Content
- 207 Multi-Status (WebDAV)
- 208 Already Reported (WebDAV)

### 3xx Redirection
- 300 Multiple Choices
- 301 Moved Permanently
- 302 Found
- 303 See Other
- 304 Not Modified
- 305 Use Proxy
- 306 (Unused)
- 307 Temporary Redirect
- 308 Permanent Redirect (experimental)


### 4xx Client Error
- 400 Bad Request
- 401 Unauthorized
- 402 Payment Required
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 406 Not Acceptable
- 407 Proxy Authentication Required
- 408 Request Timeout
- 409 Conflict (The request could not be completed due to a conflict with the current state of the resource)
- 410 Gone (The requested resource is no longer available at the server and no forwarding address is known)
- 411 Length Required
- 412 Precondition Failed
- 413 Request Entity Too Large
- 414 Request-URI Too Long
- 415 Unsupported Media Type
- 416 Requested Range Not Satisfiable
- 417 Expectation Failed
- 418 I'm a teapot (RFC 2324)
- 420 Enhance Your Calm (Twitter)
- 422 Unprocessable Entity (WebDAV)
- 423 Locked (WebDAV)
- 424 Failed Dependency (WebDAV)
- 425 Reserved for WebDAV
- 426 Upgrade Required
- 428 Precondition Required
- 429 Too Many Requests
- 431 Request Header Fields Too Large
- 444 No Response (Nginx)
- 449 Retry With (Microsoft)
- 450 Blocked by Windows Parental Controls (Microsoft)
- 451 Unavailable For Legal Reasons
- 499 Client Closed Request (Nginx)


### 5xx Server Error
- 500 Internal Server Error
- 501 Not Implemented
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout
- 505 HTTP Version Not Supported
- 506 Variant Also Negotiates (Experimental)
- 507 Insufficient Storage (WebDAV)
- 508 Loop Detected (WebDAV)
- 509 Bandwidth Limit Exceeded (Apache)
- 510 Not Extended
- 511 Network Authentication Required
- 598 Network read timeout error
- 599 Network connect timeout error


---
### Useful reference articles.
This framework has good mix of ES6 syntax usage, especially arrow functions.
- [ES6 Arrow Functions](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)
- [Arrow Functions for Beginners](https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc)
- [Express: Using a Database with Mongoose](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
- [Mongoose API](https://mongoosejs.com/docs/api.html)
- [Introduction to Mongoose for MongoDB](https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57)


---
### FYI: Debug the solution.
You may choose any technique that you are already familiar for debugging the solution. However it is worth evaluating the following tools for your solution development activity.

- ##### Debug Frontend: [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
Chrome DevTools is a set of web developer tools built directly into the Google Chrome browser. DevTools can help you edit pages on-the-fly and diagnose problems quickly.
```bash
# Chrome DevTools
https://developers.google.com/web/tools/chrome-devtools/

# Debugging JavaScript - Chrome DevTools 101
https://www.youtube.com/watch?v=H0XScE08hy8
```

- ##### Debug Backend: [Visual Studio Code](https://code.visualstudio.com/)
The Visual Studio Code editor has built-in debugging support for the Node.js runtime and can debug JavaScript, TypeScript, and many other languages that are transpiled into JavaScript.

```bash
# Visual Studio Code
https://code.visualstudio.com/

# Node.js debugging in VS Code
https://code.visualstudio.com/docs/nodejs/nodejs-debugging
```

