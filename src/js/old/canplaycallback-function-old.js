// callback function for the video element 'canplay' event fired by video when it's ready to play
// we can delete this now it's been replaced by handleVideoReady
function canPlayCallback() {
	const eventTime = new Date();
	console.log(`Can now play video: ${heroVideo.src}`);
	console.log(
		`canplay event fired: ${eventTime.getHours()}:${eventTime.getMinutes()}:${eventTime.getSeconds()}:${eventTime.getMilliseconds()}`
	);
	// const videoStatus = document.querySelector(".video-status");
	// temp for testing
	// videoStatus.innerHTML += `<p>Can now play video: ${heroVideo.src}</p>`;

	// if video hasn't been set to autoplay by the VideoFullWidthComponent, play it now
	if (heroVideo.dataset.autoplay == "false") {
		console.log(`setting autoplay on ${heroVideo.src}`);

		// play() follows the same rules as autoplay, and all modern browsers are cool with it
		// so play() will do, maybe in a try catch if we want to handle the error
		playVideo;
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
