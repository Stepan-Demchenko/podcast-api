const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'categories'
        }
    ]
});