(function () {
	const testHeroImg: HTMLImageElement = document.querySelector(".hero__image");

	// const img = document.querySelector(".test-img");
	console.log(`layout: testHeroImg.src: ${testHeroImg.src}`);
	console.log(`layout: testHeroImg.complete: ${testHeroImg.complete}`);
	console.log(`layout: testHeroImg.naturalWidth: ${testHeroImg.naturalWidth}`);

	testHeroImg.onload = () => {
		console.log(`layout onload: testHeroImg.src: ${testHeroImg.src}`);
		console.log(`layout onload: testHeroImg.complete: ${testHeroImg.complete}`);
		console.log(`layout onload: testHeroImg.naturalWidth: ${testHeroImg.naturalWidth}`);
	};
})();
