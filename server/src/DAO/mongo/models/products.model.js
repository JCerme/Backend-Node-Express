import mongoose from 'mongoose';

// PRODUCTS SCHEMA
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
});

mongoose.set('strictQuery', false);
const productsModel = mongoose.model('products', productSchema);
export default productsModel;
