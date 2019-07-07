(window => {
	// const hideLoadingOverlay = () => {
	// 	document.querySelector(".loading-overlay").classList.add("fading-out");
	// 	setTimeout(() => {
	// 	    document.querySelector(".loading-overlay").classList.remove("fading-out");
	// 	    document.querySelector(".loading-overlay").classList.add("faded");
	// 	}, 200);
	// };

	const queryStringParams = Qs.parse(window.location.search.substring(1));
	console.log(queryStringParams)

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
		await sleep(75);
		document.body.classList.add("loaded");

		await sleep(1000);
		document.querySelector(".entry-shadow").classList.add("hide");

		document.body.classList.add("fully-loaded");
	};

	const pageLoadedHandler = async () => {
		// setTimeout(hideLoadingOverlay, 2000);
		if (queryStringParams.debug == "yes") {
			await sleep(2000); // mock loading for prototype
		}
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

	document.addEventListener('DOMContentLoaded', pageLoadedHandler);
})(window);