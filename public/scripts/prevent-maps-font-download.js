// Preventing the Google Maps libary from downloading an extra font
// from: https://stackoverflow.com/questions/25523806/google-maps-v3-prevent-api-from-loading-roboto-font/25902239#25902239

(function () {
	var isRobotoStyle = function (element) {
		// roboto font download
		// amended to include any href starting with fonts.googleapis.com
		// (there's also a link to fonts.googleapis.com/css?family=Google+Sans+Text)
		if (element.href && element.href.indexOf("https://fonts.googleapis.com/") === 0) {
			// console.log("returning true because of element.href!");
			return true;
		}

		// right, think the following code is trying to prevent insertion of style elements that create the @font-family rules
		// probably so that there are no calls to missing fonts (once the link hrefs have been prevented)
		// BUT removing all .gm-style elements is breaking the marker infoWindow popup
		// think we can safely leave all the gm-style elements in...?
		// so comment this whole chunk out

		// alternatively, try and find a suitable search string to target font rules...?
		// nah, because wherever .gm-style is specifying fonts (i.e. roboto) it's also listing fallback fonts (e.g. arial, sans-serif)
		// so it should be ok to leave these style tags in

		// ------------------------------------------------------------------
		/*

		// roboto style elements

		// think this is specific to old ie versions, can't find much about it in any specifications
		if (
			element.tagName.toLowerCase() === "style" &&
			element.styleSheet &&
			element.styleSheet.cssText &&
			element.styleSheet.cssText.replace("\r\n", "").indexOf(".gm-style") === 0
		) {
			element.styleSheet.cssText = "";
			console.log("returning true bc roboto style elements!");
			return true;
		}
		// roboto style elements for other browsers
		if (
			element.tagName.toLowerCase() === "style" &&
			element.innerHTML &&
			element.innerHTML.replace("\r\n", "").indexOf(".gm-style") === 0
		) {
			element.innerHTML = "";
			console.log("returning true bc roboto style elements for other browsers!");
			return true;
		}
		*/
		// ----------------------------------------------------------------

		// when google tries to add empty style
		if (element.tagName.toLowerCase() === "style" && !element.styleSheet && !element.innerHTML) {
			// console.log("returning true bc empty style!");
			return true;
		}

		// console.log("returning false!");
		return false;
	};

	// we override these methods only for one particular head element
	// default methods for other elements are not affected
	// var head = $('head')[0];
	// var head = document.querySelector("head"); // non jquery
	// or just:
	const head = document.head;

	var insertBefore = head.insertBefore;
	head.insertBefore = function (newElement, referenceElement) {
		if (!isRobotoStyle(newElement)) {
			insertBefore.call(head, newElement, referenceElement);
		}
	};

	// don't think this appendChild thing is ever used
	// i.e. isRobotoStyle() is never true for textNode
	var appendChild = head.appendChild;
	head.appendChild = function (textNode) {
		// if (!isRobotoStyle($(textNode)[0])) { // original jquery
		if (!isRobotoStyle(textNode)) {
			appendChild.call(head, textNode);
		}
	};

	// NB! From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
	// "The call() method calls a function with a given 'this' value and arguments provided individually."

	// What the code block immediately above does is make a copy of the appendChild method of document.head
	// then replace document.head.appendChild with the copy of the method inside a conditional
	// so that when/if google maps calls it (if the element href contains 'https://fonts.googleapis.com/'), it does nothing. I think...?!
})();
