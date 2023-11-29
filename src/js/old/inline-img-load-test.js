(function () {
	const testHeroImg = document.querySelector(".hero__image");
	// const img = document.querySelector(".test-img");
	console.log(`testHeroImg.src: ${testHeroImg.src}`);
	console.log(`testHeroImg.complete: ${testHeroImg.complete}`);
	console.log(`testHeroImg.naturalWidth: ${testHeroImg.naturalWidth}`);

	testHeroImg.onload = () => {
		console.log(`testHeroImg.src: ${testHeroImg.src}`);
		console.log(`testHeroImg.complete: ${testHeroImg.complete}`);
		console.log(`testHeroImg.naturalWidth: ${testHeroImg.naturalWidth}`);
	};
})();
