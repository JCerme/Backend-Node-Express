export default class UserDTO {
    constructor(user) {
        this.first_name = user?.first_name ?? '';
        this.last_name = user?.last_name ?? '';
        this.email = user?.email ?? '';
        this.password = user?.password ?? '';
        this.role = user?.role ?? 'user';
        this.cart = user?.cart ?? '';
        this.avatar = user?.avatar ?? '';
        this.premium = user?.premium ?? false;
        this.documents = user?.documents ?? [];
        this.last_connection = user?.last_connection ?? new Date();
    }
}