const pass = process.env.db_password;
const username = process.env.username;
const collectionUrl = process.env.collection_url;
const dbUrl =  `mongodb+srv://${username}:${pass}@${collectionUrl}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailInfoSchema = new Schema({
    name: String,
    surname: String,
    patronymic: String,
    email: String
});
const MessageSchema = new Schema({
    text: String
});
const EmailInfo = mongoose.model('EmailInfo', EmailInfoSchema, 'emailInfo' );
const Message = mongoose.model('Message', MessageSchema, 'messages' );


module.exports = { EmailInfo, Message, dbUrl };