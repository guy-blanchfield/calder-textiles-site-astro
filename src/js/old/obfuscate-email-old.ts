function obfuscateEmail(address: string, linkClass: string = "") {
	const emailAddress = address;
	const emailCharCodes = [...emailAddress].map((c) => c.charCodeAt(0));
	// console.log(`emailCharCodes is ${emailCharCodes}`);
	// console.log(`emailCharCodes isArray: ${Array.isArray(emailCharCodes)}`);

	const emailAddressObf = emailCharCodes.reduce((prev, curr) => `${prev}&#${curr};`, "");

	return `<a href="mailto:${emailAddressObf}" class="${linkClass}">${emailAddressObf}</a>`;
}

export default obfuscateEmail;
