import MessageDTO from '../DAO/DTO/messages.dto.js'

export default class MessageRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getMessages = async () => await this.dao.getMessages()
    getMessageById = async (id) => await this.dao.getMessageById(id)
    createMessage = async (message) => await this.dao.createMessage(new MessageDTO(message))
    updateMessage = async (id, message) => await this.dao.updateMessage(id, message)
    deleteMessage = async (id) => await this.dao.deleteMessage(id)
}