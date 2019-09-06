const mongoose = require('mongoose');
var BlogSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
		type: String,
		unique: true,
		trim: true,
		required: true
	},
	slug: {
		type: String,
		unique: true,
		trim: true,
		required: true
	},
	content: {
		type: String,
		trim: true,
		required: true
	},
	date: {
		type: Date,
		required: true
	}

});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;