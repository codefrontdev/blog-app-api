const mongoose = require('mongoose');
const Joi = require('joi');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 300
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 300
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    image: {
        type: String,
        default: 'default-avatar.png'
    },
},{
    timestamps: true
});


const Author = mongoose.model('Author', AuthorSchema);




// Validate Create Author

function validationCreateAuthor(obj) {
    const shcema = Joi.object({
        firstName: Joi.string().trim().min(3).max(300).required(),
        lastName: Joi.string().trim().min(3).max(300).required(),
        nationality: Joi.string().trim().min(2).max(100).required(),
        image: Joi.string()
    })

    return shcema.validate(obj)
}



// Validate Update Author


function validationUpdateAuthor(obj) {
    const shcema = Joi.object({
        firstName: Joi.string().trim().min(3).max(300),
        lastName: Joi.string().trim().min(3).max(300),
        nationality: Joi.string().trim().min(2).max(100),
        image: Joi.string()
    })

    return shcema.validate(obj)
}


module.exports = {
    Author,
    validationCreateAuthor,
    validationUpdateAuthor
}