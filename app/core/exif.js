const { ExifImage } = require('exif');

const getExif = imageBuffer => {
	return new Promise((resolve, reject) => {
		try {
			new ExifImage({ image: imageBuffer }, (error, exifData) => {
				error ? reject(error) : resolve(exifData);
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	getExif
};