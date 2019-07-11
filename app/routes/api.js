const fs = require('fs');
const path = require('path');
const express = require('express');
const photos = require('../core/photos');

const router = express.Router();

let routerToReturn = appDir => {
	// Test (Hello World) API route
	router.get('/', (req, res) => res.status(200).send({ status: res.statusCode, message: "OK", data: "Hello, world!" }));

	// Get photos route
	router.get('/photos', async (req, res) => {
		let photoInfo = await photos.getPhotos();

		// res.setHeader('Cache-Control', 'no-cache'); // for debug purposes, REMOVE LATER!!!
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.status(200).send(photoInfo);
	});

	return router;
};

module.exports = routerToReturn;