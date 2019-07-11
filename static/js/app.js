(window => {
	// const hideLoadingOverlay = () => {
	// 	document.querySelector(".loading-overlay").classList.add("fading-out");
	// 	setTimeout(() => {
	// 	    document.querySelector(".loading-overlay").classList.remove("fading-out");
	// 	    document.querySelector(".loading-overlay").classList.add("faded");
	// 	}, 200);
	// };

	// IMPORTANT VARIABLES
	window.photosJson = {};
	window.photoIds = [];

	// const queryStringParams = Qs.parse(window.location.search.substring(1));
	// console.log(queryStringParams)

	const sleep = time => {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		});
	};

	const hideLoadingOverlay = async () => {
		document.querySelector("div.loading-box").classList.remove("anim");

		let spansToChange = document.querySelectorAll("div.loading-box div.loading-head span");
		// console.log('spansToChange', spansToChange);
		for (let i = 0; i < spansToChange.length; i++) {
			// console.log(`round ${i}`);
			spansToChange[i].classList.add("disappear");
			await sleep(30);
		}
		await sleep(65);
		document.body.classList.add("loaded");

		await sleep(1000);
		document.querySelector(".entry-shadow").classList.add("hide");

		document.body.classList.add("fully-loaded");
	};

	const showLoadingOverlay = async () => {
		let spansToChange = document.querySelectorAll("div.loading-box div.loading-head span");

		document.body.classList.remove("fully-loaded");

		document.querySelector(".entry-shadow").classList.remove("hide");
		// await sleep(1000);

		document.body.classList.remove("loaded");
		await sleep(65);

		for (let i = (spansToChange.length - 1); i >= 0; i--) {
			spansToChange[i].classList.remove("disappear");
			await sleep(30);
		}

		document.querySelector("div.loading-box").classList.add("anim");
	};

	const checkImagesReady = id => {
		photoIds = photoIds.filter(e => e !== id);
		if (photoIds.length === 0) {
			hideLoadingOverlay();
		}
	};
	window.checkImagesReady = checkImagesReady;

	const showPhotos = () => {
		// showLoadingOverlay(); // loading photos
		
		// other stuff now
		let images = photosJson.data.map(k => { return { src: k.link, w: 0, h: 0, title: k.description }; });
		let pswpElement = document.querySelectorAll('.pswp')[0];

		// define options (if needed)
		let options = {
		    index: 0
		};

		// Initializes and opens PhotoSwipe
		let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, images, options);
		
		// thanks to https://github.com/dimsemenov/PhotoSwipe/issues/741
		gallery.listen('imageLoadComplete', (index, item) => {
			if (item.h < 1 || item.w < 1) {
				let img = new Image();
				img.onload = () => {
					item.w = img.width;
					item.h = img.height;
					gallery.invalidateCurrItems();
					gallery.updateSize(true);
				}
				img.src = item.src;
			}
		});

		gallery.init();

		// // confusing structure, fix this! nvm, it's a quarter to 1 AM
		// for (let i = 0; i < images.length; i++) {
		// 	let imageElem = document.createElement("img");
		// 	imageElem.src = images[i];
		// 	imageElem.setAttribute("onload", `checkImagesReady("${photosJson.data[i].id}");`);

		// 	document.querySelector("#photo-gallery").appendChild(imageElem);
		// }
	};

	const smartPhotoCount = num => {
		let photoString = num === 1 ? "Photo" : "Photos";
		return `${num} ${photoString}`;
	};

	const pageLoadedHandler = async () => {
		// setTimeout(hideLoadingOverlay, 2000);
		/* BELOW WAS FOR PROTOTYPE, AND THUS, IT IS COMMENTED OUT */
		// if (queryStringParams.debug == "yes") {
		// 	await sleep(2000); // mock loading for prototype
		// }

		console.log('test');
		let photoReq = await fetch("/api/photos");
		photosJson = await photoReq.json();
		photoIds = photosJson.data.map(k => k.id);

		let photoCount = photosJson.data.length;
		document.getElementById("photoCount").parentElement.classList.add("loaded");
		document.getElementById("photoCount").innerText = smartPhotoCount(photoCount);

		console.log(photosJson);

		setTimeout(hideLoadingOverlay, 40); // last step
	};

	/* loading intro init */
	let loadingElem = document.querySelector("div.loading-box div.loading-head");
	let loadingChars = loadingElem.innerText;

	let newLoadingHTML = "";
	for (let i = 0; i < loadingChars.length; i++) {
		let currentChar = loadingChars.charAt(i);
		newLoadingHTML += `<span>${currentChar}</span>`;
	}
	loadingElem.innerHTML = newLoadingHTML;
	/* end loading intro */

	window.hideLoadingOverlay = hideLoadingOverlay; // for debug, REMOVE LATER!
	window.showLoadingOverlay = showLoadingOverlay; // for debug, REMOVE LATER!

	document.querySelector(".thumb.photography").parentElement.addEventListener("click", showPhotos);
	document.addEventListener('DOMContentLoaded', pageLoadedHandler);
})(window);