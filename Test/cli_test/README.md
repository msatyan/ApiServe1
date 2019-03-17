

### package.json

```json
// using it with nodemon
  "scripts": {
    // "test": "nodemon --exec \"mocha test/cli_test -R min\""
    "test": "nodemon --exec \"mocha --recursive -R min\""
  }

```
or

```json
"scripts": {
  "test": "mocha $(find test/cli_test -name '*.js')"
}
```


