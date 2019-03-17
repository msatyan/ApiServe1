const mongoose = require('mongoose');

// tell mongoose to use ES6 implementation of promise instead of its default
mongoose.Promise = global.Promise;

// https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.set('useFindAndModify', false);

before((done) => {
    // The 'before' hook will be executed only once for the entire test.
    // ie, the connection needs to be established once and remain open.

    mongoose.connect('mongodb://localhost:27017/my_db1_test', {
        useNewUrlParser: true
    });
    mongoose.connection
        .once('open', () => {
            console.log('Connection Success!!!');

            // Inform mocha that connection is ready to start the test.
            done();
        })
        .on('error', (error) => {
            console.warn('Error', error);
        });
});


beforeEach((done) => {
    // the 'beforeEach' hook will get executed before each test in this test suit

    const { products } = mongoose.connection.collections;

    products.drop()
        // we have completed the drop operation
        // This will drop the index too, if so we have to recreate the index.

        // For to recreate Index on certain filed
        // By specifying a collation strength of 1 or 2, you can create a case-insensitive index.
        // Index with a collation strength of 1 is both diacritic- and case-insensitive.
        .then( () => products.createIndex( { price: 1, name: 1 }) )
        .then(() => done())
        .catch(() => done());

});
