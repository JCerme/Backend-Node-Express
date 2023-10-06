export default class PublicUserDTO {
    constructor(user) {
        this.first_name = user?.first_name ?? '';
        this.last_name = user?.last_name ?? '';
        this.email = this.hideEmail(user?.email) ?? '';
        this.role = user?.role ?? 'user';
    }

    get () {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role: this.role
        }
    }

    hideEmail(email) {
        const [emailName, emailDomain] = email.split('@');
        const hiddenEmailName = emailName.slice(0, 3) + '***';
        const hiddenEmailDomain = emailDomain.slice(0, 3) + '***';
        return hiddenEmailName + '@' + hiddenEmailDomain;
    }
}