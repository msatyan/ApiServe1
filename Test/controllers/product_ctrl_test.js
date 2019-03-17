const assert = require('assert');
const request = require('supertest');
const app = require('../../app')

const mongoose = require('mongoose');
const Product = mongoose.model( 'product');

describe('Product controller', () => {

    let cd1 = {
        name: 'CD',
        description: 'Very good CD',
        price: 10.24
    };

    let dvd1 = {
        name: 'DVD',
        description: 'Very good DVD',
        price: 12.56
    };

    let bd1 = {
        name: 'BR',
        description: 'Very good BR',
        price: 15.80
    };


    // To test selection of multiple records
    it('GET: a list of products', (done) => {
        const prod1 = new Product( cd1 );
        const prod2 = new Product( dvd1 );
        const prod3 = new Product( bd1 );

        // save all records
        Promise.all( [ prod1.save(), prod2.save(), prod3.save() ] )
        .then( () => {
            request(app)
            .get('/v1/product?minprice=11&maxprice=14') // We expected to get DVD
            .end(  (err, response) => {
                // console.log( response.body );
                assert( response.body.length === 1 );
                assert( response.body[0].name === 'DVD' );
                done();
                });
        });
    });



    // Testing the POST request.
    it('POST: to /v1/product create a new product', done => {
        // Let us take document count before we insert a record.
        Product.countDocuments().then(OldCount => {
            request(app)
                .post('/v1/product') // make a post request
                .send( dvd1 )
                .end(() => {
                    Product.countDocuments().then(NewCount => {
                        assert(OldCount + 1 === NewCount);
                        done();
                    });
                });
        });
    });

    // Testing the PUT request.
    it('PUT: to /v1/product/:id Update a product', done => {
        // Create a product record for us to test update
        let new_price = 11.25;
        const prod = new Product( cd1 );

        // save the record to the database.
        prod.save().then( () => {
            //now let us make a PUT request to the API and try to update the saved record.
            request(app)
            .put( `/v1/product/${prod._id}` )
            .send( {price: new_price} ) // send alone the field(s) to be updated on the record
            .end( () => {
                // Now we will try to get the record and see the value has updated.
                Product.findOne( {_id: prod._id} )
                .then( (prod_1) => {
                    // check the record has the updated value.
                    assert( prod_1.price === new_price );
                    done();
                })
            })
        } )
    });


    // Testing DELETE
    it('DELETE: to /v1/product/:id a product', done => {

        // Create a product record for us to test DELETE
        const prod = new Product( cd1 );

        // save the record to the database.
        prod.save().then( () => {
            //now let us make a DELETE request to the API
            request(app)
            .delete( `/v1/product/${prod._id}` )
            .end( () => {
                // Now we will try to get the record and check whether the record exist.
                Product.findOne( {_id: prod._id} )
                .then( (prod_1) => {
                    // check the record has the updated value.
                    assert( prod_1 === null );
                    done();
                })
            })
        } )
    });


});
