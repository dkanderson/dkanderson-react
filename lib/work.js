const mongoose = require('mongoose');
var WorkSchema = new mongoose.Schema({
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
	content: {
		type: String,
		trim: true,
		required: true
	},
	project_url: {
		type: String,
		trim: true,
		required: true
	},
	client_banner_class: {
		type: String,
		trim: true,
		required: true
	},
	tech: {
		type: Array,
		required: true
	},
	project_bg: {
		type: String,
		trim: true,
		required: true
	},
	screenshot_a: {
		type: String,
		trim: true,
		required: true
	},
	screenshot_b: {
		type: String,
		trim: true,
		required: false
	},
	screenshot_c: {
		type: String,
		trim: true,
		required: false
	},
	banner: {
		type: String,
		trim: true,
		required: true
	}
});

const Work = mongoose.model('Work', WorkSchema);
module.exports = Work;