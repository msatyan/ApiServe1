const assert = require('assert');
const Product = require('../../models/product_mongoose_model');

describe('Update product records', () => {

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


    function MyAssertHelper(y, done) {
        y.then(() => Product.find({})) // Find all records
            .then((products) => {
                assert(products.length === 1);
                assert(products[0].name === 'BD');
                done();
            });
    }

    ///// Instance based update
    it('update by using  Model instance set and save', (done) => {
        // Let's update the name from DVD to BD
        prod.set('name', 'BD');
        // save to the database and call helper function for any verification.
        MyAssertHelper(prod.save(), done);
    });


    it('update by using  Model instance updateOne', (done) => {
        // (update and save in one shot) and then call MyAssertHelper to validate
        MyAssertHelper(prod.updateOne( {name: "BD"}), done);
    });

    ///// Class based update
    it('UPDATE:  Class updateOne', (done) => {
        MyAssertHelper(Product.updateOne( {name: "DVD"}, {name: "BD"} ), done);
    });

    it('UPDATE:  Class updateMany', (done) => {
        // Find all records that has DVD and replace with BD.
        MyAssertHelper(Product.updateMany( {name: "DVD"}, {name: "BD"} ), done);
    });

    it('UPDATE:  Class findOneAndUpdate', (done) => {
        // https://mongoosejs.com/docs/deprecations.html#-findandmodify-
        // Updates a single document based on the filter and sort criteria.
        // Find one records that has DVD and replace with BD.
        MyAssertHelper(Product.findOneAndUpdate({name: "DVD"}, {name: "BD"}), done);
    });

    it('UPDATE:  Class findByIdAndUpdate', (done) => {
        // Find the records of the DVD based on it's id and replace with BD.
        MyAssertHelper(Product.findByIdAndUpdate( prod._id, {name: "BD"} ), done);
    });
});
