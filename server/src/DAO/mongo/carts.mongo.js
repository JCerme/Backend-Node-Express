import CustomError from "../../services/errors/custom_error.js";
import ERR_DICT from "../../services/errors/enums.js";
import cartsModel from "./models/carts.model.js"
import productsModel from "./models/products.model.js"

export default class Cart {
    getCarts = async () => await cartsModel.find()
    getCart = async (cid) => await cartsModel.findById(cid).populate('products.product').exec();

    addCart = async (cart) => await cartsModel.create(cart)
    addProductToCart = async (pid, cid) => {
        try {
            const product = await productsModel.findOne({ "_id": pid }).lean();
            const cart = await cartsModel.findOne({ "_id": cid }).lean();

            !product && CustomError.createError(
                ERR_DICT.PRODUCT,
                'Product not found',
                `Product with id ${pid} not found`
            );
            !cart && CustomError.createError(
                ERR_DICT.CART,
                'Cart not found',
                `Cart with id ${cid} not found`
            );

            const cartProduct = cart.products.find(
                p => p.product.toString() === product._id.toString()
            );

            if (cartProduct) {
                cartProduct.units += 1;
                return await cartsModel.updateOne(
                    { "_id": cid, "products.product": cartProduct.product },
                    { $set: { "products.$.units": cartProduct.units } }
                );
            } else {
                return await cartsModel.updateOne(
                    { "_id": cid },
                    { $push: { "products": { product: product._id, units: 1 } } }
                );
            }
        } catch (err) {
            CustomError.createError(
                ERR_DICT.CART,
                'Error adding product to cart',
                err
            );
        }
    }

    deleteProductFromCart = async (pid, cid) => await cartsModel.updateOne(
        {"_id": cid},{$pull:{"products":{product:pid}}}
    )
    updateCart = async (cid, updatedCart) => await cartsModel.updateOne(
        { "_id": cid }, { $set: updatedCart }
    )
    updateProductUnits = async (pid, cid, units) => {
        await cartsModel.findOneAndUpdate(
            { "_id": cid, "products.product": pid },
            { $set: { "products.$.units": units } }
        )
        return await cartsModel.findById(cid).populate('products.product').exec();
    }
    clearCart = async (cid) => await cartsModel.findOneAndUpdate(
        { "_id": cid }, { "products": [] }
    )
}