const mongoose = require('mongoose');
const Joi = require('joi');

// Book Schema

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 250
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author',
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    price: {
        type: Number,
        required: true,
        min: 0
    },
    cover: {
        type: String,
        required: true,
        enum: ['soft cover', "hard cover"]
    }
}, {timestamps: true});


// Book Model

const Book = mongoose.model('Book', BookSchema);




// Validate Create Book

function validateCreateBook(obj) {
    const shcema = Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        author: Joi.string().required(),
        description: Joi.string().min(5).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid('soft cover', "hard cover").required()
    });
    
    return shcema.validate(obj);
}

// Validate Update Book

function validateUpdateBook(obj) {
    const shcema = Joi.object({
        title: Joi.string().trim().min(3).max(250),
        author: Joi.string(),
        description: Joi.string().trim().min(5),
        price: Joi.number().min(0),
        cover: Joi.string().valid('soft cover', "hard cover")
    });
    
    return shcema.validate(obj);
}

module.exports = {
    Book,
    validateCreateBook,
    validateUpdateBook
}