import { messageService } from "../services/index.js";
import response from "../helpers/response.js";

export const getMessages = async (req, res) => {
    try {
        const result = await messageService.getMessages()
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const getMessageById = async (req, res) => {
    try {
        const { mid } = req.params
        const result = await messageService.getMessageById(mid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const createMessage = async (req, res) => {
    try {
        const message = req.body
        const result = await messageService.createMessage(message)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const updateMessage = async (req, res) => {
    try {
        const { mid } = req.params
        const updatedMessage = req.body
        const result = await messageService.updateMessage(mid, updatedMessage)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { mid } = req.params
        const result = await messageService.deleteMessage(mid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}