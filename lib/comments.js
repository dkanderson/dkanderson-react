const mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
	id: {
        type: Number,
        unique: true,
        required: true
    },
    blog_id: {
        type: Number,
        unique: false,
        required: true
    },
	blog_slug: {
		type: String,
		unique: false,
		trim: true,
		required: true
	},
	username: {
		type: String,
		trim: true,
		required: true
	},
	content: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	date: {
		type: String,
		trim: true,
		required: true
	},
	url: {
		type: String,
		trim: true,
		required: false
	}
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;