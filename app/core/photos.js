const fs = require('fs');
// const getExif = require('get-exif');
// const { getExif } = require('./exif');
const util = require('./util');
// const modifyExif = require('modify-exif');

/* GOT RID OF THIS, NOT HOSTING LOCALLY */
// const getPhotos = async appDir => {
// 	let photoDir = await fs.promises.readdir(`${appDir}/photos`);
// 	let newPhotoList = [];

// 	for (let i = 0; i < photoDir.length; i++) {
// 		let photoFile = await fs.promises.readFile(`${appDir}/photos/${photoDir[i]}`);
// 		try {
// 			let exifInfo = await getExif(photoFile);
// 			newPhotoList.push({ name: photoDir[i], exif: exifInfo });
// 		} catch (e) {
// 			throw new Error(e);
// 		}
// 	}

// 	return newPhotoList;
// };

const getPhotos = async () => {

};

module.exports = {
	getPhotos // get all photos and info in directory
};