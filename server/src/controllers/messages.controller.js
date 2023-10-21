import { messageService } from "../services/index.js";
import response from "../helpers/response.js";

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

export const addMessage = async (context, data, socket = null) => {
    try {
        const msg = context.body || data;

        let userId, userFullName;
        if (context.session?.user) {
            userId = context.session?.user?._id;
            userFullName = context.session?.user?.first_name + ' ' + context.session?.user?.last_name;
        } else if (data?.user) {
            // Obtener datos del usuario desde el objeto data (opcional, solo si lo permites)
            userId = data.user.id;
            userFullName = data.user.name;
        }

        if (!userId) {
            const errorMessage = 'User not logged in';
            if (context.res) {
                return context.res.send(await response('error', errorMessage, context.query));
            } else if (socket) {
                return socket.emit('error', errorMessage);
            }
        }

        msg.user_id = userId;
        msg.user = userFullName;

        const result = await messageService.addMessage(msg);
        
        if (context.res) {
            context.res.send(await response('success', result, context.query));
        } else if (socket) {
            socket.emit('success', 'Message added successfully');
        }
    } catch (error) {
        req.logger.error(error);
        if (context.res) {
            context.res.status(500).send(await response('error', 'Server error', context.query));
        } else if (socket) {
            socket.emit('error', 'Server error');
        }
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