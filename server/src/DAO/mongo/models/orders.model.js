import mongoose from 'mongoose';

// TICKET SCHEMA
const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    purchase_date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        required: true,
    },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    }],
});

mongoose.set('strictQuery', false);
const orderModel = mongoose.model('order', orderSchema);
export default orderModel;
