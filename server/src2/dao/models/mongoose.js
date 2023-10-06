import mongoose from 'mongoose';

// PRODUCTS SCHEMA
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
});

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
    user: {
        type: String,
        unique: true,
        index: true,
    },
    products: [cartProductSchema],
});

// MESSAGES SCHEMA
const messageSchema = new mongoose.Schema({
    room: {
        type: Number,
        default: 0,
        index: true,
    },
    user: String,
    message: String,
    admin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const roomSchema = new mongoose.Schema({
    code: {
        type: Number,
        unique: true,
        index: true,
    },
    messages: [messageSchema],
});

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        index: true,
    },
    password: String,
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
});

mongoose.set('strictQuery', false);
const productsModel = mongoose.model('products', productSchema);
const cartsModel = mongoose.model('carts', cartsSchema);
const messagesModel = mongoose.model('messages', messageSchema);
const roomsModel = mongoose.model('rooms', roomSchema);
const usersModel = mongoose.model('users', userSchema);

export { productsModel, cartsModel, messagesModel, roomsModel, usersModel };
