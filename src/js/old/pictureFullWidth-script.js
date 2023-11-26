// wait for the image to load, then transition the opacity
// think this script will only run once, not once for each instance of the component
// so grabs the img inside all pictures with class picture--blur-load

const pictureElements = document.querySelectorAll(".picture--blur-load");

// pictureElements.forEach((pictureEl) => {
for (const pictureEl of pictureElements) {
	const pictureImg = pictureEl.querySelector("img");

	// check if the image is loaded first
	// otherwise add a load event listener

	// NB! if the all the srcSet images fail (e.g. 404s)
	// pictureImg.complete will return true
	// so we need to test whether the src image exists
	// maybe try getting the height / width of the image?
	// if the image has loaded these will be positive values otherwsie they'll be 0

	// done plenty of testing and fairly sure .complete and .naturalWidth can be relied on
	// to refer to the image chosen by the browser from srcset
	// NOT the fallback path that's in src to start off with
	// the value for naturalWidth IS related to the vw i.e. the way the browser renders the image
	// but we only need to know that it's NOT zero

	// it's probably firefox's throttling / caching that can't be trusted
	// that's what's causing the script to go straight to picture--show
	// even when throttled (hence not showing the blur lqip, but still waiting for the hq image to download)
	// hopefully in a live environment this won't happen...?!

	console.log(`complete: ${pictureImg.complete}, naturalWidth: ${pictureImg.naturalWidth}`);
	// temp for testing
	// const alwaysFalse: boolean = false;

	// do we need .complete? is naturalWidth all we really need?
	// .complete seems to be inconsistent
	// if (pictureImg?.complete && pictureImg?.naturalWidth) {
	if (pictureImg?.naturalWidth) {
		// we want a different process here
		// from when the load event fires
		// bc if the image is already loaded
		// it doesn't really need the blur fade transition
		// (it's probably already been downloaded previously)
		// add 'blur-loading' NOT 'blur-load' (which is the class that identifies which images want a blur-load)
		// imgLoaded(pictureEl);
		// maybe we don't need anything to happen here?

		// add blur-loading here just to test how it affects lighthouse
		// console.log("and also adding picture--blur-loading to test");
		// pictureEl.classList.add("picture--blur-loading");

		console.log(`${pictureImg.src} is complete so adding picture--show`);
		pictureEl.classList.add("picture--show");

		// add blur-loading here just to test how it affects lighthouse
		// console.log("and also adding picture--blur-loading to test");
		// pictureEl.classList.add("picture--blur-loading");
		// tests inconclusive: performance score ranges from 88-92 on all inside pages

		// right, just noting this here, performance score is related to the window size
		// so if the browser chooses a smaller image from srcset, performance score will be better
		// note that the lqip doesn't change (there are no smaller versions of the lqip)
		// so it must be about the size of the hq image
		// (we tried it without sectionPicture and scores were no different so it's the hero image that's the issue)

		// deleting / renaming the webp image (so it fails to load) improves performance score signingicantly - 99!)
		// so when lighthouse uses the lqip as lcp performance score is improved
		// can we conclude that lighthouse isn't using the lqip as lcp? try making a full resolution lqip 2360x1330?
		// no, bc lcp element is identified thus:

		// webp renamed: picture.hero__picture.picture--blur-load.astro-H4CVHZ34.picture--blur-loading (score 98)
		// or with picture--show forced:
		// picture.hero__picture.picture--blur-load.astro-H4CVHZ34.picture--blur-loading.picture--show (score 99)
		// webp normal and picture--show forced:
		// picture.hero__picture.picture--blur-load.astro-H4CVHZ34.picture--blur-loading.picture--show (score 89)

		// or sometimes it's img.hero__image.astro-H4CVHZ34 (score 90)

		// right, tested it with forced filter and opacity transitions AND the showHeroText transition
		// score is still higher without the big image, so it's probably not the transitions
		// probably safe to assume that when the lqip is lcp, score is high, when hq image is lcp, score is lower

		// is it possible that this is related to simulated throttling and what is actually happening is lighthouse
		// gets the hq image first and goes straight to --show instead of --blur-loading
		// nope - tested in devtools throttling mode and performance was better with the big image renamed
	} else {
		// add the class that sets a transition
		// so that picture--show will cause a fade when the load event fires

		console.log(`${pictureImg.src} is NOT complete so adding picture--blur-loading`);
		pictureEl.classList.add("picture--blur-loading");
		pictureImg.addEventListener("load", () => {
			console.log(`img load event fired so adding picture--show`);
			pictureEl.classList.add("picture--show");
		});
	}
}
