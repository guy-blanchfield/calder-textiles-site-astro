// currently the initialise function is called by the script section of Preloader.astro
// in two places:
// either in the function handleTransitionEnd()
// or the globally added DOMContentLoaded listener

function initialise() {
	// get refs ----------------------------------------------

	const heroImage: HTMLImageElement = document.querySelector(".hero__image") ?? undefined;
	const heroVideo: HTMLMediaElement = document.querySelector(".video-element") ?? undefined;
	const heroTextDiv: HTMLDivElement = document.querySelector(".hero__text") ?? undefined;
	// const heroElement: HTMLElement = document.querySelector(".hero") ?? undefined;
	const heroOverlay: HTMLElement = document.querySelector(".hero__overlay") ?? undefined;

	// and a ref to the loading animation (which is in hero > hero__loader-container)
	// think we need to add and remove the loader (for hero video) from here
	// even though it's being handled from PictureFullWidth for hero image
	const heroLoader: HTMLElement = document.querySelector(".hero__loader-container").querySelector(".loader");

	// functions ---------------------------------------------

	function handleHeroTextTransition() {
		heroTextDiv.classList.add("hero__text--visible");
		console.log(`hero__text--visible class added!`);

		// now add a listener for the transitionend so we can amend the transition property
		// once the transition has run
		// otherwise there's a tendency for chrome to try and transition it (fade it out and move it down)
		// when navigating to a new page
		heroTextDiv.addEventListener("transitionend", () => {
			heroTextDiv.classList.add("hero__text--transitioncomplete");
			console.log(`hero__text--transitionend class added!`);
		});
	}

	function showHeroText() {
		console.log("showHeroText function");

		// if the --visible class isn't there, add it
		// not sure we need this conditional, classList.add should be smart enough
		// if (!heroTextDiv.classList.contains("hero__text--visible")) {
		// tried doing this with a delay on the transition property in the --visible class
		// but chrome didn't like it, it kept showing the div at the end of its transition
		// for the duration of the delay, then starting the transition

		// so we'll use a setTimeout with a delay

		// it needs a delay because the image or video have a fade-in time (currently 250ms for image, 2s for video)

		// try using a data-attribute in the html element (heroVideo or heroImage)
		// and read that here to set the transition-duration

		// so we're now setting a data property for duration and delay
		// the delay is for the img opacity transition and the duration is for the filter blur transition that follows it

		// MDN says: (note that dashes are converted to camel case).
		// heroTextTransitionDelay is equal to the time it takes the image to fade in (delay) plus the filter blur to disappear (duration)

		// NB! Problem here is that is if blur-loading phase is skipped (i.e image is already loaded / cached)
		// the heroText transition is still going to have the extra delay
		// so we'll have to update the data-transition-duration attribute when skipping blur-loading

		// currently the video always gets the filter blur so it should use both delay and duration
		// but the image only needs duration if it's gone to blur-loading
		// (filter transition is duration, opacity transition is delay!)
		const heroTextTransitionDelay: number = heroImage
			? parseInt(heroImage.dataset.transitionDuration) + parseInt(heroImage.dataset.transitionDelay)
			: parseInt(heroVideo.dataset.transitionDuration) + parseInt(heroVideo.dataset.transitionDelay);
		// Number() won't work to extract 2000 from "2000ms", use parseInt()
		// consider adding a bit to this to give the transition a bit of room
		console.log("herotextTransitionDelay: ", heroTextTransitionDelay);
		console.log("parseInt(herotextTransitionDuration): ", heroTextTransitionDelay);
		setTimeout(handleHeroTextTransition, heroTextTransitionDelay);
		// }
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
		// console.log("heroImage: ", heroImage);
		try {
			await heroImage.decode();
			// when the decode promise resolves run showHeroText()
			console.log(`image decode successful so running showHeroText()`);
			showHeroText();
		} catch (err) {
			console.log(`there was an error decoding the image: ${err}`);
		}
	}

	function heroVideoReady() {
		// if video is already loaded and playing just manually call the handleVideoReady function
		// this was formerly readyState >= 2 but it seems a readystate of 1 was too late to catch the loadedmetadata event
		// yeah according to mdn readystate 1 is eqivalent to HAVE_METADATA
		// it's always 0 on chrome, and alternates between 0 and 1 on firefox
		if (heroVideo.readyState >= 1) {
			console.log(`calling callback manually because readystate is ${heroVideo.readyState}`);
			// canPlayCallback();
			handleVideoReady();
		} else {
			// otherwise set an event listener for the canplay event
			console.log(`adding video event listener because readystate was ${heroVideo.readyState}`);
			// heroVideo.addEventListener("canplay", canPlayCallback);
			// try loadedmetadata event instead of canplay event (because safari)
			// in tests with throttling at 3G, there was a 1 millisecond difference between the
			// loadedmetadata event and the canplay event, so this should be ok
			heroVideo.addEventListener("loadedmetadata", handleVideoReady);
			// try loadeddata, see if stops the delay between the event and the video showing - nope
			// heroVideo.addEventListener("loadeddata", handleVideoReady);

			// show the hero loading animation
			console.log("adding loading animation for the hero video");
			heroLoader.classList.add("loader--loading");
		}
	}

	function playVideo(video: HTMLMediaElement) {
		// play() follows the same rules as autoplay, and all modern browsers are cool with it
		// so play() will do, maybe in a try catch if we want to handle the error
		try {
			video.play();
			// temp for testing
			// videoStatus.innerHTML += `<p>Playing video OK</p>`;
		} catch (err) {
			console.log(`Error playing video: ${err}`);
			// temp for testing
			// videoStatus.innerHTML += `<p>Error playing video: ${err}</p>`;
		}
	}

	function handleVideoReady() {
		// const eventTime = new Date();
		console.log(`Video ready: ${heroVideo.src}`);
		// console.log(
		// `metadataloaded event fired: ${eventTime.getHours()}:${eventTime.getMinutes()}:${eventTime.getSeconds()}:${eventTime.getMilliseconds()}`
		// );
		// const videoStatus = document.querySelector(".video-status");
		// temp for testing
		// videoStatus.innerHTML += `<p>Video ready: ${heroVideo.src}</p>`;

		// if video hasn't been set to autoplay by the VideoFullWidthComponent, play it now
		// AND if location hash is not #aboutus - I says nah, transition still stutters, it's not the video
		if (heroVideo.dataset.autoplay == "false") {
			console.log(`trying to play() ${heroVideo.src}`);

			playVideo(heroVideo);
		}

		// add the --show class to video container
		// this will fade the filter blur out (transition filter blur(1rem) to filter blur(0))

		// NB! we need to make sure the video has full faded in before removing the blur
		// otherwise we see the acky background image

		// the video opacity fade is done through a descendant selector on video-container--show
		// i.e. .video-container--show .video-element { opacity: 1; }

		// so the 2 transitions (the video fade-in AND the blur fade-out) *are* happening at the same time
		// BUT the blur fade-out has a delay matching the duration length of the opacity fade-in

		// so the blur fade-out definitely shouldn't be happening before the video fades in

		// Update!! decided to ditch the bg image placeholder and the blur because of the above issue
		// so we don't need to add the video-container--show class - it was just for the blur transition
		// we can also get rid of the eventlistener for the container transition end - that was just to remove the bg image
		// but we will need to change the descendant selector for video-element to a dedicated class (say video-element--show)

		// Update again!!! decided to keep the flter blur to cover up the ugly colour shift when the video starts
		// (or after the transition ends if a transition is present) in chrome (it's caused by hardware acceleration)
		// let's keep the separate class for video-element though - the descendant selector is a bit problematic

		heroVideo.parentElement?.classList.add("video-container--show");
		console.log("adding the --show class to the video container");
		heroVideo.classList.add("video-element--show");

		// we also need to show the hero_overlay, which now starts off hidden
		// (so the gradient background doesn't show before the image loads)
		if (heroOverlay) {
			heroOverlay.classList.add("hero__overlay--show");
		}

		// hide the hero loading animation
		console.log("removing loading animation for the hero video");
		heroLoader.classList.remove("loader--loading");
		// show the hero text
		console.log(`calling showHeroText function`);
		showHeroText();

		// we should hide the background image when the video is ready
		// otherwise it has a nasty habit of showing when we leave the page
		// i.e. on leaving the page, the video disappears first, leaving the ugly background image showing underneath
		// think we can do this by putting a backgound-image: none on .video-container--show

		// we need to leave the background image in for a moment because the video doesn't appear
		// instantaneously, at least not in throttled simulations
		// so we should listen for the transition end event on the video container
		// and remove the background image once the transition has ended
		// so we'll need another class, say --remove-bg

		/*
		heroVideo.parentElement?.addEventListener("transitionend", (e) => {
			// check this is the transitionend we're looking for
			console.log("transitionend event from: ", e.target);
			console.log("event target matches .video-container: ", (<HTMLElement>e.target).matches(".video-container"));
			if (!(<HTMLElement>e.target).matches(".video-container")) return;

			// tested this with a long delay - it is definitely not being
			// applied until the video element opacity transition finishes
			// i.e. it's working correctly (it's not the cause of any gap before the video shows)
			heroVideo.parentElement?.classList.add("video-container--remove-bg");
			console.log("Adding --remove-bg class (because the transition ended) to: ", heroVideo.parentElement);
		});
		*/
	}

	// check if fonts are ready then
	// check either image is ready or video is ready
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
