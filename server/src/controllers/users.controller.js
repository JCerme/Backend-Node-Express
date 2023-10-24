import { userService } from "../services/index.js";
import response from "../helpers/response.js";

export const getUsers = async (req, res, next) => {
    try {
        const result = await userService.getUsers()
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { uid } = req.params
        const result = await userService.getUserById(uid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const getUserByEmail = async (req, res, next) => {
    try {
        const { to } = req.params
        const result = await userService.getUserByEmail(to)
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const addUser = async (req, res, next) => {
    try {
        const user = req.body
        const result = await userService.addUser(user)
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { uid } = req.params
        const updatedUser = req.body
        const result = await userService.updateUser(uid, updatedUser)
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { uid } = req.params
        const result = await userService.deleteUser(uid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}