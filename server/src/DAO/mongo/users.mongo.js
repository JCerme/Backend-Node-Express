import usersModel from './models/users.model.js';

export default class User{
    addUser = async (user) => await usersModel.create(user);
    getUserByEmail = async (uemail) => await usersModel.findOne({"email": uemail}).lean();
    getUserById = async (uid) => await usersModel.findById(uid).lean();
    updateUser = async (uid, user) => await usersModel.findByIdAndUpdate(uid, user);
    deleteUser = async (uid) => await usersModel.findByIdAndDelete(uid);
}