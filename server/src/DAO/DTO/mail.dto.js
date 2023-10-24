export default class MailDTO {
    constructor(mail) {
        this.to = mail?.to ?? null;
        this.subject = mail?.subject ?? null;
        this.text = mail?.text ?? null;
        this.html = mail?.html ?? null;
    }
}