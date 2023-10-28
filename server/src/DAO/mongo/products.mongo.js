import CustomError from "../../services/errors/custom_error.js";
import ERR_DICT from "../../services/errors/enums.js";
import productsModel from "./models/products.model.js";

export default class Product {
    getProducts = async (limit = 20, page = 1, query = null, value = null, sort) => {
        try {
            const filter = query && value ? { [query]: value } : {};
            const products = await productsModel.find(filter).limit(limit).skip((limit * page) - limit).sort({"price": sort || 1}).lean();
            return products;
        } catch(e) {
            CustomError.createError(
                ERR_DICT.PRODUCT,
                'Error getting products',
                e,
                'User tried to get products, but an error occurred'
            );
        }
    }
    getProductByID = async (pid) => {
        try {
            return await productsModel.findById(pid).lean();
        } catch(e) {
            CustomError.createError(
                ERR_DICT.PRODUCT,
                'Error getting product',
                e,
                'User tried to get a product, but an error occurred'
            );
        }
    };
    addProduct = async (product) => {
        try {
            return await productsModel.create(product)
        } catch(e) {
            CustomError.createError(
                ERR_DICT.PRODUCT,
                'Error adding product',
                e,
                'User tried to add a product, but an error occurred'
            );
        }
    };
    updateProduct = async (pid, updatedProduct) => {
        try {
            return await productsModel.updateOne({"_id": pid}, {$set: updatedProduct});
        } catch(e) {
            CustomError.createError(
                ERR_DICT.PRODUCT,
                'Error updating product',
                e,
                'User tried to update a product, but an error occurred'
            );
        }
    };
    deleteProduct = async (pid) => {
        try {
            return await productsModel.deleteOne({"_id": pid})
        } catch(e) {
            CustomError.createError(
                ERR_DICT.PRODUCT,
                'Error deleting product',
                e,
                'User tried to delete a product, but an error occurred'
            );
        }
    };
}