import mongoose from 'mongoose';

// CARTS SCHEMA
const cartProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    units: {
        type: Number,
        required: true,
        default: 1,
    },
});

const cartsSchema = new mongoose.Schema({
    products: [cartProductSchema],
});

mongoose.set('strictQuery', false);
const cartsModel = mongoose.model('carts', cartsSchema);
export default cartsModel;
