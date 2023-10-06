export default class OrderRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getOrders = async () => this.dao.getOrders()
    createOrder = async (order) => await this.dao.createOrder(order)
    getOrderByCode = async (code) => await this.dao.getOrderByCode(code)
}