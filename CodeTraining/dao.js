const pass = process.env.db_password;
const username = process.env.username;
const collectionUrl = process.env.collection_url;
const dbUrl =  `mongodb+srv://${username}:${pass}@${collectionUrl}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
    name:  {type: Map, of: String, unique: true},
    slogan: {type: Map, of: String},
    details: {type: Map, of: String},
});

const ApplierSchema = new Schema({
    name: String,
    surname: String,
    email: { type: String, unique: true },
    phone: String,
    status: { type: String, enum: ['not seen', 'accepted', 'declined'] },
    details: String,
    confirmedEmail: Boolean
});

const Training = mongoose.model('Training', TrainingSchema, 'trainings' );
const Applier = mongoose.model('Applier', ApplierSchema, 'appliers' );

module.exports = { Training, Applier, dbUrl };