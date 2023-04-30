const Joi = require('joi');

exports.UserSchema = function (mongoose) {
    const mongooseUser = new mongoose.Schema({
        userId: String,
        username: String,
        password: String,
        userType: Number,
        createdAt: Date
    });

    return  mongoose.model(process.env.MONGOOSE_USERS_COLLECTION, mongooseUser);
}

exports.joiUser = Joi.object({
    userId: Joi.string(),
    username: Joi.string(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    userType: Joi.number()
        .integer()
        .min(0)
        .max(2),
    createdAt: Joi.date()
})
