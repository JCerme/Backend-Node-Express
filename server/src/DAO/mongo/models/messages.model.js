import mongoose from 'mongoose';

// MESSAGES SCHEMA
const messageSchema = new mongoose.Schema({
    room: {
        type: Number,
        default: 0,
        index: true,
    },
    uid: {
        type: String,
        default: '',
    },
    name: String,
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

mongoose.set('strictQuery', false);
const messagesModel = mongoose.model('messages', messageSchema);
const roomsModel = mongoose.model('rooms', roomSchema);

export { messagesModel, roomsModel };
