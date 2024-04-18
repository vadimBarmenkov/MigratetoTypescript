import {Schema, model} from 'mongoose';

const bookSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        required: true,
    },
    favorite: {
        type: String,
        required: true,
    },
    fileCover: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    }
});

module.exports = model('Book', bookSchema);