const mongoose = require('mongoose')
const validator = require('validator')

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    loginName: {
        type: String,
        required: true,
        trim: true
    },
    workPhone: {
        type: String,
        required: true,
        trim: true
    },
    personalPhone: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true
    },
    rate: {
        type: String,
        trim: true
    },
    workEmail: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    personalEmail: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (value && !validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', user)

module.exports = User