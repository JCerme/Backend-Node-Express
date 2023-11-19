export default class MessageDTO {
    constructor(message) {
        this.room = message?.room ?? 0;
        this.uid = message?.uid ?? null;
        this.name = message?.name ?? '';
        this.message = message?.message ?? '';
        this.admin = message?.admin ?? false;
    }
}