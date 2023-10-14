import MessageDTO from '../DAO/DTO/messages.dto.js'

export default class MessageRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getMessages = async () => await this.dao.getMessages()
    getMessageById = async (id) => await this.dao.getMessageById(id)
    addMessage = async (message) => await this.dao.addMessage(new MessageDTO(message))
}