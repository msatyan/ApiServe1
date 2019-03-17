const assert = require('assert');
const Product = require('../../models/product_mongoose_model');

describe('Read product records from the db', () => {

    // let the object is declared outer block so that
    // it can be accessed across all inner blocks of this test.
    let prod;

    beforeEach((done) => {
        prod = new Product({
            name: "DVD",
            price: 12.35
        });
        prod.save()
        .then( () => done() );
    });


    // The optional 'done' is available to every single 'it' block
    it('Find all records with DVD', (done) => {

        // find all products with name DVD, so we will get an arry of products.
        Product.find( {name: 'DVD'})
        .then( (products) => {
            // _id is an object, so we need to convert it into a primitive
            assert( products[0]._id.toString() === prod._id.toString() );
            done();
        } )

    });

    it('Find a specific records with name DVD', (done) => {
        // find a specific products with ID.
        Product.findOne( { _id: prod._id })
        .then( (product) => {
            assert( product.name === 'DVD' );
            done();
        } )
    });


});
