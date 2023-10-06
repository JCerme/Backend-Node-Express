export default class UserDTO {
    constructor(user) {
        this._id = user?._id ?? '';
        this.first_name = user?.first_name ?? '';
        this.last_name = user?.last_name ?? '';
        this.email = user?.email ?? '';
        this.password = user?.password ?? '';
        this.role = user?.role ?? 'user';
        this.cart = user?.cart ?? '';
    }
}