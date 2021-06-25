const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        min: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        min: 3,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

//Defining findByCredentials method to check credentials
userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        // Comparing the password
        if (!user)
            throw new Error('User not Found');
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return ('Invalid Password');
        return user;
    }
    catch (error) {
        return (error);
    }
}


userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified(password)) {
        user.password = await new bcrypt.hash(user.password, 10);
        user.password = password;
    };
    next();
});

const User = mongoose.model('userInfo', userSchema);
module.exports = User;
