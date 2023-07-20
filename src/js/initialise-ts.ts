function initialise() {
	console.log(`This is the imported initialise function`);
}

// this is where we put anything that needs to happen after the loader is done
// but isn't part of the loader
function initialiseOld() {
	// const heroImage: HTMLImageElement = document.querySelector('hero__image');
	// check if hero__image exists i.e. it's not a hero video instead
	const heroImage: HTMLImageElement = document.querySelector(".hero__image") ?? undefined;
	const heroVideo: HTMLMediaElement = document.querySelector(".video-element") ?? undefined;
	// const heroVideo: HTMLVideoElement = document.querySelector(".video-element");
	// const heroVideoContainer: HTMLElement = document.querySelector(".video-container") ?? undefined;
	// const heroVideoContainerSpan: HTMLElement = document.querySelector(".video-container__span") ?? undefined;

	const heroTextDiv: HTMLDivElement = document.querySelector(".hero__text") ?? undefined;
	// reapply the class to reset the transition
	// nope, that doesn't work
	// try a reset class
	// heroTextDiv.classList.remove("hero__text");
	// console.log(`resetting hero__text class`);
	// heroTextDiv?.classList.add("hero__text--reset");
	// heroTextDiv?.classList.remove("hero__text--visible");
	// heroTextDiv?.classList.remove("hero__text");

	console.log("initialise!!!!!!!!");
	// heroVideo.setAttribute("autoplay", "");

	// this needs to happen on transition end as well, if it hasn't happened
	function showHeroText() {
		console.log("showHeroText function is running");
		console.log(`hero__text: ${document.querySelector(".hero__text")}`);

		// const msgDiv = document.createElement("div");
		// let msgNode = document.createTextNode("Classes: ");
		// msgDiv.appendChild(msgNode);
		// heroTextDiv.appendChild(msgDiv);
		// heroTextDiv.classList.forEach((c) => {
		// 	msgDiv.textContent += `${c}, `;
		// });

		// heroTextDiv.style.opacity = "0";
		// console.log(`heroTextDiv.style.opacity: ${heroTextDiv.style.opacity}`);

		// const heroTextDiv = document.querySelector(".hero__text");

		// if the --visible class isn't there, add it
		if (!heroTextDiv.classList.contains("hero__text--visible")) {
			// heroTextDiv.classList.remove("hero__text--reset");
			// doing this with a timeout because chrome didn't like the transition delay
			// it kept showing the div at the end of its transition for the
			// duration of the delay, then starting the transition

			// it needs a delay because the image or video have a 0.5s fade in time
			// suppose we could call showHeroText on a timeout instead, but we'll see...
			// nah cos it's called from at least two different places so makes sense to put
			// the timeout here
			// still hate it though
			setTimeout(() => {
				heroTextDiv.classList.add("hero__text--visible");
				console.log(`hero__text--visible class added!`);
			}, 500);
			// heroTextDiv.classList.add("hero__text--visible");
		}
	}

	// think we need to move the fonts ready check into the loader
	// incorporate the fonts ready check with the loader , not check it after the loader has finished
	// it should also be inside the !preloadComplete condition
	// we don't need to check fonts for each page

	async function fontsReady() {
		let ready = await document.fonts.ready;
		console.log(ready);
		// in the following logs, fonts will only return true if they are used in a css class
		// that is being used in the html!
		// regardless of whether their @font-face is declared or if they're preloaded in the head
		console.log(`Libre Baskerville: ${document.fonts.check("12px Libre Baskerville")}`);
		console.log(`Tex Gyre Heros: ${document.fonts.check("12px tex_gyre_heros")}`);
		// console.log(`Baskerville: ${document.fonts.check('12px Baskerville Normal')}`);
		console.log("fonts should be ready");
		// showHeroText();
	}

	// this is going to check that the hero image is loaded
	// or if it's video, whether the video has loaded enough to play a bit
	async function heroImageReady() {
		console.log(`heroImageReady function called`);
		if (heroImage) {
			let ready = await heroImage.decode();
			console.log(ready);
			console.log("hero image should be ready");
			showHeroText();
		} else {
			console.log(`!heroImage, must be video`);

			// callback funtion for the 'canplay' event fired by video when it's ready to play
			function canPlayCallback() {
				console.log(`Can now play video: ${heroVideo.src}`);

				// showHeroVideo();

				// if video hasn't been set to autoplay by the VideoFullWidthComponent
				// set it to autoplay now,
				// actually just play it
				if (heroVideo.dataset.autoplay == "false") {
					console.log(`setting autoplay on ${heroVideo.src}`);
					console.log(`because dataset.autoplay is: ${heroVideo.dataset.autoplay}`);
					// heroVideo.classList.add("video-element--show");
					// heroVideo.setAttribute("autoplay", "");
					// NB!! from: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
					// The play() method may cause the user to be asked to grant permission to play the media,
					// resulting in a possible delay before the returned promise is resolved.
					// Be sure your code doesn't expect an immediate response.

					// play() follows the same rules as autoplay, and all modern browsers are cool with it
					// so play() will do, maybe in a try catch if we want to handle the error

					// edge won't autoplay!!!?
					// edge won't autoplay when setAttribute is called from here
					// but will when it's called from VideoFullWidth - why??

					// obvious difference is that calling from here only happens
					// after the canplay event fires
					try {
						heroVideo.play();
					} catch (err) {
						console.log(`Error playing video: ${err}`);
					}
				}

				// we only want the first canplay event
				// (it fires after every time the video buffers)
				// so remove this eventlistener

				heroVideo.removeEventListener("canplay", canPlayCallback);
				console.log("removing video event listener");

				console.log(`calling showHeroText function`);
				showHeroText();
			}

			if (heroVideo) {
				// test readystate for edge
				console.log(`heroVideo readystate: ${heroVideo.readyState}`);
				// if video is already loaded and playing just manually call the canPlayCallback
				if (heroVideo.readyState >= 2) {
					console.log(`calling callback manually because readystate is ${heroVideo.readyState}`);
					canPlayCallback();
				} else {
					// otherwise set an event listener for the canplay event
					console.log(`adding video event listener`);
					heroVideo.addEventListener("canplay", canPlayCallback);
				}
			}
		}
	}

	// fontsReady().then(heroImageReady).then(showHeroText);
	// only chain fontsReady and imageReady and call showHeroText
	// manually in the image if clause of imageReady and add an event listener
	// in the video else clause to call showHeroText
	// because I can't find a way to get the video check to return a promise, i.e. can't be awaited
	fontsReady().then(heroImageReady);

	// Ok, the issue here is that before showHeroText can run, 3 conditions need to be met
	// 1. fonts are loaded
	// 2. hero image or first bit of hero video is loaded
	// 3. if the preloader is running it needs to have finished and faded out
}

// export default initialise;
export { initialise, initialiseOld };
