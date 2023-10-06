import UserDTO from "../DAO/DTO/users.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUsers = async () => await this.dao.getUsers()
    getUserById = async (id) => await this.dao.getUserById(id)
    getUserByEmail = async (email) => await this.dao.getUserByEmail(email)

    createUser = async (user) => await this.dao.createUser(new UserDTO(user))
    updateUser = async (id, user) => await this.dao.updateUser(id, user)
    deleteUser = async (id) => await this.dao.deleteUser(id)
}