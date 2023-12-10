import { messageService } from "../services/index.js";
import response from "../helpers/response.js";
import { logger } from "../helpers/logger.js";

export const getMessages = async (req, res, next) => {
    try {
        const result = await messageService.getMessages()
        res.json(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const getMessageById = async (req, res, next) => {
    try {
        const { mid } = req.params
        const result = await messageService.getMessageById(mid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const addMessage = async (msg, socket = null) => {
    try {
        if (!msg.uid || !msg.name || !msg.message) {
            const errorMessage = 'Missing required fields';
            if (socket) return socket.emit('error', errorMessage);
        }

        const message = {
            uid: msg.uid,
            name: msg.name,
            message: msg.message,
        };

        const result = await messageService.addMessage(message);
        if (socket) socket.emit('success', 'Message added successfully');
    } catch (error) {
        logger.error(error);
        if (socket) socket.emit('error', 'Server error');
    }
}

export const updateMessage = async (req, res, next) => {
    try {
        const { mid } = req.params
        const updatedMessage = req.body
        const result = await messageService.updateMessage(mid, updatedMessage)
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const deleteMessage = async (req, res, next) => {
    try {
        const { mid } = req.params
        const result = await messageService.deleteMessage(mid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}
