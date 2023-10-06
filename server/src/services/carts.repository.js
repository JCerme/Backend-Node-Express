import CartDTO from '../DAO/DTO/carts.dto.js'

export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getCart = async (cid) => await this.dao.getCart(cid)
    getCarts = async () => await this.dao.getCarts()

    addCart = async (cart) => await this.dao.addCart(new CartDTO(cart))
    addProductToCart = async (pid, cid) => await this.dao.addProductToCart(pid, cid)

    deleteProductFromCart = async (pid, cid) => await this.dao.deleteProductFromCart(pid, cid)
    updateCart = async (cid, updatedCart) => await this.dao.updateCart(cid, updatedCart)
    updateProductUnits = async (pid, cid, units) => await this.dao.updateProductUnits(pid, cid, units)
    clearCart = async (cid) => await this.dao.clearCart(cid)
}