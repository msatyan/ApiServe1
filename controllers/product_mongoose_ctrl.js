const Product = require( '../models/product_mongoose_model' )

class CProductCtrl {
    constructor() {
    }

    // Select a set of records
    GetAll(req, res, next) {
        // TODO: ADD query string filter support

        // FYI:
        // A Get request cannot contain a request body, then we have to use query params
        // see req.query for more information
        // http://mydomain.com?height=21&width=25
        // const { height, width} = req.query;

        // Get all records
        let query_filter = {};

        if ( Object.keys(req.query).length > 0 )
        {
            console.log( req.query );
            // url is '/v1/product?minprice=11&maxprice=14'
            const { minprice, maxprice} = req.query;
            // let query_filter = {price: { $gt: minprice, $lt: maxprice } };
            query_filter = {price: { $gt: parseFloat(minprice), $lt: parseFloat(maxprice) } };
            // let query_filter = {price: { $gt: 11, $lt: 14 } };
            // let query_filter = {price: 12.56 };
            // let query_filter = { };
        }

        Product
            .find( query_filter)
            .then( doc => {
                res.send( doc );
            })
            .catch(err => {
                console.error(err)
                res.status(404).send( { error: err.message } );
            });
            // .catch(next); // let the middleware handle if any error
    }

    //GET:id  (select a specific record by its ID)
    GetOne(req, res, next) {
        Product.findById( req.params.id, (err, doc) => {
            if (err) {
                res.status(404).send( { error: 'The record not found' } );
            } else {
                res.send(doc);
            }
        });
    }

    // POST
    PostReq(req, res, next) {
        Product.create(req.body)
            .then(doc => {
                res.send(doc);
            })
            .catch(next); // let the middleware handle if any error
    }

    // PUT
    PutReq(req, res, next) {
        const id = req.params.id;

        Product.findByIdAndUpdate( { _id: id }, req.body)
            .then(  () => Product.findById( {_id: id} )   )
            .then( product => res.send(product) ) // send the updated record back to the requester
            .catch(next); // let the middleware handle if any error
    }

    // DELETE
    DelReq(req, res, next) {
        Product.findByIdAndRemove( { _id: req.params.id } )
            .then(  (doc) => {
                res.status(204) // Deleted successfully
                    .send(doc);
            }) // sent the deleted record back to the caller
            .catch(next); // let the middleware handle if any error
    }
}

module.exports  = new CProductCtrl();
