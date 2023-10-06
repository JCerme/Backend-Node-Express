import { messagesModel } from "./models/messages.model.js";

export default class Message {
    getMessages = async () => await messagesModel.find().lean();
    addMessage = async (msg) => await messagesModel.create(msg);
}