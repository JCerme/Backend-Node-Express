import MessageDTO from '../DAO/DTO/messages.dto.js'

export default class MessageRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getMessages = async () => await this.dao.getMessages()
    getMessageById = async (id) => await this.dao.getMessageById(id)
    addMessage = async (message) => {
        message = new MessageDTO(message);
        await this.dao.addMessage(message);
    }
}