function initialise() {
	// get refs ----------------------------------------------

	const heroImage: HTMLImageElement = document.querySelector(".hero__image") ?? undefined;
	const heroVideo: HTMLMediaElement = document.querySelector(".video-element") ?? undefined;
	const heroTextDiv: HTMLDivElement = document.querySelector(".hero__text") ?? undefined;

	// functions ---------------------------------------------

	function showHeroText() {
		console.log("showHeroText function");

		// if the --visible class isn't there, add it
		if (!heroTextDiv.classList.contains("hero__text--visible")) {
			// tried doing this with a delay on the transition property in the --visible class
			// but chrome didn't like it, it kept showing the div at the end of its transition
			// for the duration of the delay, then starting the transition

			// so we'll use a setTimeout with a half second delay

			// it needs a delay because the image or video have a 0.5s fade in time

			setTimeout(() => {
				heroTextDiv.classList.add("hero__text--visible");
				console.log(`hero__text--visible class added!`);
			}, 500);
		}
	}

	async function fontsReady() {
		let ready = await document.fonts.ready;
		console.log(`document.fonts.ready: ${ready}`);
		// in the following logs, fonts will only return true if they are used in a css class
		// that is being used in the html!
		// regardless of whether their @font-face is declared or if they're preloaded in the head
		console.log(`Libre Baskerville: ${document.fonts.check("12px Libre Baskerville")}`);
		console.log(`Tex Gyre Heros: ${document.fonts.check("12px tex_gyre_heros")}`);
	}

	async function heroImageReady() {
		console.log(`heroImageReady function called`);

		let ready = await heroImage.decode();
		console.log(`heroImage.decode(): ${ready}`);
		showHeroText();
	}

	function heroVideoReady() {
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

	// callback function for the video element 'canplay' event fired by video when it's ready to play
	function canPlayCallback() {
		console.log(`Can now play video: ${heroVideo.src}`);

		// if video hasn't been set to autoplay by the VideoFullWidthComponent, play it now
		if (heroVideo.dataset.autoplay == "false") {
			console.log(`setting autoplay on ${heroVideo.src}`);

			// play() follows the same rules as autoplay, and all modern browsers are cool with it
			// so play() will do, maybe in a try catch if we want to handle the error
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

		// show the hero text
		console.log(`calling showHeroText function`);
		showHeroText();
	}

	// check if fonts are ready then check either image is ready or video is ready
	// heroImageReady calls showHeroText
	// heroVideoReady sets an eventlistener ('canplay') with a callback (canplayCallback)
	// and the callback calls showHeroText
	// this is because the image readiness can be awaited but the video readiness can only be
	// ascertained with the 'canplay' event
	fontsReady().then(() => {
		if (heroImage) {
			heroImageReady();
		} else if (heroVideo) {
			heroVideoReady();
		}
	});
}

// end initialise

export default initialise;