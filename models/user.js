var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Create Schema for our mongo database. substituting our previous created 'User Class'
// the 'unique' key is making sure that a user with same input doesnt already exist.
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,

    },
    lastname: {
        type: String,
        required: true,
    }
});

//authenticate user input to databse (username and password)
UserSchema.statics.authenticate = function(username, password, callback) {
    User.findOne({ username: username })
    .exec(function (error, user) {
        if (error) {
            return callback(error);
        } else if ( !user ) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    });
};

// hash password before saving to database.
// We do this by using the 'pre' method, which runs the following function just before saving to DB (pre saves it)
UserSchema.pre('save', function(next) {
    //using 'this' binds the user variable to the current user.
    var user = this;
    //hash method, which takes the password, a number (the higher the more secure), and then the hashing function.
    bcrypt.hash(user.password, 5, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
