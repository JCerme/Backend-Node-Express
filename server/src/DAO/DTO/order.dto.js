export default class OrderDTO {
    constructor(order) {
        this.code = order?.code ?? '';
        this.purchase_date = order?.purchase_date ?? '';
        this.amount = order?.amount ?? 0;
        this.purchaser = order?.purchaser ?? '';
        this.products = order?.products ?? [];
    }
}