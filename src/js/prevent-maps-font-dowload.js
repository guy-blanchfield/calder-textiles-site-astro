// Preventing the Google Maps libary from downloading an extra font
(function () {
	console.log("prevent maps script running");
	var isRobotoStyle = function (element) {
		// roboto font download
		if (element.href && element.href.indexOf("https://fonts.googleapis.com/css?family=Roboto") === 0) {
			return true;
		}
		// roboto style elements
		if (
			element.tagName.toLowerCase() === "style" &&
			element.styleSheet &&
			element.styleSheet.cssText &&
			element.styleSheet.cssText.replace("\r\n", "").indexOf(".gm-style") === 0
		) {
			element.styleSheet.cssText = "";
			return true;
		}
		// roboto style elements for other browsers
		if (
			element.tagName.toLowerCase() === "style" &&
			element.innerHTML &&
			element.innerHTML.replace("\r\n", "").indexOf(".gm-style") === 0
		) {
			element.innerHTML = "";
			return true;
		}
		// when google tries to add empty style
		if (element.tagName.toLowerCase() === "style" && !element.styleSheet && !element.innerHTML) {
			return true;
		}

		return false;
	};

	// we override these methods only for one particular head element
	// default methods for other elements are not affected
	// var head = $('head')[0];
	// non jquery: var head = document.querySelector('head');
	// or just:
	const head = document.head;

	var insertBefore = head.insertBefore;
	head.insertBefore = function (newElement, referenceElement) {
		if (!isRobotoStyle(newElement)) {
			insertBefore.call(head, newElement, referenceElement);
		}
	};

	var appendChild = head.appendChild;
	head.appendChild = function (textNode) {
		// if (!isRobotoStyle($(textNode)[0])) {
		if (!isRobotoStyle(document.querySelector(textNode))) {
			appendChild.call(head, textNode);
		}
	};

	console.log("prevent maps script finished");
})();
