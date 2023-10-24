import mongoose from 'mongoose';

// PWD_CODE SCHEMA
const pwd_codeSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    code: String,
    createdAt: { type: Date, default: Date.now },
});

mongoose.set('strictQuery', false);
const pwd_codesModel = mongoose.model('pwd_codes', pwd_codeSchema);
export default pwd_codesModel;
