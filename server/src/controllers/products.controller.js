import { productService } from "../services/index.js"
import response from "../helpers/response.js"

export const getProducts = async (req, res) => {
    try {
        const result = await productService.getProducts()
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const getProductByID = async (req, res) => {
    try {
        const { pid } = req.params
        const result = await productService.getProductByID(pid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body
        const result = await productService.createProduct(product)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const updatedProduct = req.body
        const result = await productService.updateProduct(pid, updatedProduct)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const result = await productService.deleteProduct(pid)
        res.send(await response('success', result, req.query))
    } catch (error) {
        console.log(error);
    }
}