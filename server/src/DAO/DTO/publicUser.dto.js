export default class PublicUserDTO {
    constructor(user) {
        this._id = user?._id ?? '';
        this.first_name = user?.first_name ?? '';
        this.last_name = user?.last_name ?? '';
        this.email = this.hideEmail(user?.email) ?? '';
        this.role = user?.role ?? 'user';
        this.avatar = user?.avatar ?? '';
        this.premium = user?.premium ?? false;
        this.documents = user?.documents ?? [];
        this.last_connection = user?.last_connection ?? new Date();
    }

    get() {
        return {
            _id: this._id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role: this.role,
            avatar: this.avatar,
            premium: this.premium,
            documents: this.documents,
            last_connection: this.last_connection,
        }
    }

    hideEmail(email) {
        const [emailName, emailDomain] = email.split('@');
        const hiddenEmailName = emailName.slice(0, 3) + '***';
        const hiddenEmailDomain = emailDomain.slice(0, 3) + '***';
        return hiddenEmailName + '@' + hiddenEmailDomain;
    }
}