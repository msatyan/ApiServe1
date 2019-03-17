const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
        // default: 0
    }
});

module.exports = mongoose.model( 'product', ProductSchema );

