const assert = require('assert');
const Product = require('../../models/product_mongoose_model');

describe('Delete product records', () => {

    let prod;

    // This will be called before each test
    beforeEach((done) => {
        prod = new Product({
            name: "DVD",
            price: 12.35
        });
        prod.save()
            .then(() => done());
    });

    ///// different way of removing record
    it('delete by using  Model instance', (done) => {

        // prod is an instance of  Product class
        // delete the record of the instance
        prod.remove()
            // Then try to find the same object in the database
            .then(() => Product.findOne({
                name: "DVD"
            }))
            .then((x) => {
                // x is the object returned by the findOne
                // it should not find the object in the database, os a null object
                assert(x === null);
                done();
            });
    });

    it('delete by using Class method', (done) => {

        // // Product is a class, and it is useful for deleting multiple records
        Product.deleteOne({
                name: "DVD"
            })
            // Then try to find the same object in the database
            .then(() => Product.findOne({
                name: "DVD"
            }))
            .then((x) => {
                // x is the object returned by the findOne
                // it should not find the object in the database, os a null object
                assert(x === null);
                done();
            });

    });

    it('delete by using  Class method findOneAndDelete', (done) => {

        // Deletes a single document based on the filter and sort criteria
        Product.findOneAndDelete({
                name: "DVD"
            })
            // Then try to find the same object in the database
            .then(() => Product.findOne({
                name: "DVD"
            }))
            .then((x) => {
                // x is the object returned by the findOne
                // it should not find the object in the database, os a null object
                assert(x === null);
                done();
            });
    });

    it('delete by using  Class method findByIdAndDelete', (done) => {
        // Deletes a single document based on the filter and sort criteria
        Product.findByIdAndDelete(prod._id)
            // Then try to find the same object in the database
            .then(() => Product.findOne({
                name: "DVD"
            }))
            .then((x) => {
                // x is the object returned by the findOne
                // it should not find the object in the database, os a null object
                assert(x === null);
                done();
            });
    });
});
