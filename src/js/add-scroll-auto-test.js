// on load, set scroll-behavior to auto to stop smooth scrolling
// if url has a #
window.addEventListener("load", windowLoadHandler);

function windowLoadHandler() {
	console.log(`location.hash: ${location.hash}`);
	// should we be more specific i.e. check if hash is #aboutus?
	if (location.hash) {
		console.log("adding scroll-auto");
		document.documentElement.classList.add("scroll-auto");
	}
	// console.log("Document.documentElement ", document.documentElement);
}
