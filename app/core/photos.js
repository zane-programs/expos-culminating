const axios = require('axios');
const util = require('./util');
const credentials = require('./credentials');

const imgurAlbum = process.env.IMGURALBUM || "WhuKEpM";

// this is gonna turn into some spaghetti code soon, so fix! It was nice async/await but it DIDN'T WORK!
const getPhotos = () => {
	return new Promise((resolve, reject) => {
		axios.get(`https://api.imgur.com/3/album/${imgurAlbum}/images`, { headers: { Authorization: `Client-ID ${credentials.imgurClientId}` } })
			.then(response => resolve(response.data))
			.catch(err => reject(err.response.data))
	});
};

module.exports = {
	getPhotos // get all photos and info in directory
};