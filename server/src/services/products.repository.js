import ProductDTO from '../DAO/DTO/products.dto.js'

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getProducts = async (limit, page, query, value, sort) => (
        await this.dao.getProducts(limit, page, query, value, sort)
    )
    getProductByID = async (id) => await this.dao.getProductByID(id)
    createProduct = async (product) => await this.dao.createProduct(new ProductDTO(product))
    updateProduct = async (id, product) => await this.dao.updateProduct(id, product)
    deleteProduct = async (id) => await this.dao.deleteProduct(id)
}