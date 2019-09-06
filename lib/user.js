const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
});

// Hash pasword before saving
UserSchema.pre('save', function(next) {
    var user = this;

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.statics.authenticate = function (username, password, callback) {
	User.findOne({ username: username})
		.exec((err, user) => {
			if ( err ) {
				return callback(err);
			} else if ( !user ) {
				var error = new Error('user not found');
				error.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, (err, result) => {
				if(result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			});
		});
}

const User = mongoose.model('User', UserSchema);
module.exports = User;