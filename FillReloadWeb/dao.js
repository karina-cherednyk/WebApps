const pass = process.env.db_password;
const username = process.env.username;
const collectionUrl = process.env.collection_url;
const dbUrl =  `mongodb+srv://${username}:${pass}@${collectionUrl}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    description: String
});
const Book = mongoose.model('Book', BookSchema, 'books' );

module.exports = { Book, dbUrl };