import { cartService } from "../services/index.js";
import response from "../helpers/response.js";

export const getCarts = async (req, res) => {
    try {
        const result = await cartService.getCarts()
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const getCartByID = async (req, res) => {
    try {
        const { cid } = req.params
        const result = await cartService.getCartByID(cid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const getCart = async (req, res) => {
    try {
        const { cart } = req.session.user || { cart: null };
        const result = await cartService.getCart(cart);
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const addCart = async (req, res) => {
    try {
        const cart = req.body
        const result = await cartService.addCart(cart)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const { pid } = req.params
        const { cart: cid } = req.session.user
        const result = await cartService.addProductToCart(pid, cid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const { pid } = req.params
        const { cart: cid } = req.session.user
        const result = await cartService.deleteProductFromCart(pid, cid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params
        const updatedCart = req.body
        const result = await cartService.updateCart(cid, updatedCart)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const updateProductUnits = async (req, res) => {
    try {
        const { pid } = req.params
        const { units } = req.body
        const { cart: cid } = req.session.user
        const result = await cartService.updateProductUnits(pid, cid, units)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params
        const result = await cartService.clearCart(cid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}