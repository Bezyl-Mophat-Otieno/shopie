interface Message {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}
declare const sendMail: (messageOptions: Message) => Promise<void>;
export default sendMail;
