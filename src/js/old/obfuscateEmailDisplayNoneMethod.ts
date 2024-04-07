// using the display: none method instead
// https://spencermortensen.com/articles/email-obfuscation/
// this requires a class in global.css with a display: none rule
function obfuscateEmail(address: string) {
	// check there's a dot first
	if (address.indexOf(".") === -1) {
		return;
	}
	// slice the address at the position of the first dot
	// insert a fake domain (.xanadu) with class of display-none
	// add the remaining portion of the address
	const addressObf = `${address.slice(0, address.indexOf("."))}<span class="display-none">.xanadu</span>${address.slice(
		address.indexOf(".")
	)}`;

	return addressObf;
}

// leaving this here for reference but not using it
// apparently html entities is ineffective in preventing spam

function obfuscateEmailHTMLEntities(address: string) {
	const emailAddress = address;
	const emailCharCodes = [...emailAddress].map((c) => c.charCodeAt(0));

	// NB remember that charCodesAt() returns an integer NOT a string
	const reduceFunc = (acc: string, curr: number) => {
		return `${acc}&#${curr};`;
	};

	const emailAddressObf = emailCharCodes.reduce(reduceFunc, "");
	return emailAddressObf;
}

export default obfuscateEmail;
