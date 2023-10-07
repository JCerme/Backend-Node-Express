import CustomError from "../../services/errors/custom_error.js";
import productsModel from "./models/products.model.js";

export default class Product {
    getProducts = async (limit = 20, page = 1, query = null, value = null, sort) => {
        try {
            const filter = query && value ? { [query]: value } : {};
            const products = await productsModel.find(filter).limit(limit).skip((limit * page) - limit).sort({"price": sort || 1}).lean();
            return products;
        } catch(err) {
            CustomError.createError(
                ERR_DICT.PRODUCT,
                'Error getting products',
                err
            );
        }
    }
    getProductByID = async (pid) => await productsModel.find({"_id": pid}).lean();
    addProduct = async (product) => await productsModel.create(product);
    updateProduct = async (pid, updatedProduct) => await productsModel.updateOne(
        {"_id": pid}, {$set: updatedProduct}
    );
    deleteProduct = async (pid) => await productsModel.deleteOne({"_id": pid})

}