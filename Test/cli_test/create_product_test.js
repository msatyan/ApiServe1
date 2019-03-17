const assert = require('assert');
// const Product = require('../../models/product_mongoose_model');
const Product = require('../../models/product_mongoose_model');

describe('Create product records for the test', () => {

    it('Creating DVD records', () => {
        const dvd = new Product({
            name: "DVD 01",
            price: 15.25
        });

        dvd.save();
    });


    // The optional 'done' is available to every single 'it' block
    it('Creating BD records', (done) => {
        const bd = new Product({
            name: "BD 01",
            price: 12.35
        });
        bd.save()
            .then(() => {
                // ready to test where the record in the database.

                // The isNew will be true until the object is not saved to the database yet.
                // Once the object is saved to the database its value will turn to false.
                assert( ! bd.isNew );
                //assert( 1+1 === 3 );
                done();
            });
    });

});
