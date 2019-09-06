const mongoose = require('mongoose');
var ArtworkSchema = new mongoose.Schema({
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
	status: {
		type: String,
		trim: true,
		required: true
	},
	medium: {
		type: String,
		trim: true,
		required: true
	},
	subject: {
		type: String,
		trim: true,
		required: true
	},
	type: {
		type: String,
		trim: true,
		required: true
	},
	size: {
		type: String,
		trim: true,
		required: true
	},
	infobox_id: {
		type: String,
		trim: true,
		required: true
	},
	original_img: {
		type: String,
		trim: true,
		required: true
	},
	painting_sm: {
		type: String,
		trim: true,
		required: true
	},
	painting_lg: {
		type: String,
		trim: true,
		required: true
	},
	orientation: {
		type: String,
		trim: true,
		required: false
	},
	price: {
		type: Number,
		required: true
	}

});

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = Artwork;