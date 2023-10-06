export default class MessageDTO {
    constructor(message) {
        this.room = message?.room ?? 0;
        this.user = message?.user ?? '';
        this.message = message?.message ?? '';
        this.admin = message?.admin ?? false;
    }
}