import usersModel from './models/users.model.js';

export default class User{
    addUser = async (user) => await usersModel.create(user);
    getUserByEmail = async (uemail) => await usersModel.findOne({"email": uemail}).lean();
}