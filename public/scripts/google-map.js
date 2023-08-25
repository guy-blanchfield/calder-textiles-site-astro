// Initialize and add the map
let map;

async function initMap() {
	// The location of Calder Textiles
	const caldertextiles = { lat: 53.680525, lng: -1.63789 };

	// Request needed libraries.
	// also access infoWindow here
	//@ts-ignore
	const { Map, InfoWindow } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
	// will we need to request infoWindow as well?

	// The map, centered at Calder Textiles
	map = new Map(document.getElementById("map"), {
		zoom: 13,
		center: caldertextiles,
		mapId: "CALDER_TEXTILES",
		// options: {
		// gestureHandling: "greedy",
		// },
		// styling (e.g. night mode) has to be done with the cloud console
		// https://developers.google.com/maps/documentation/cloud-customization/overview#cloud_tooling
	});

	// The marker, positioned at Calder Textiles
	const marker = new AdvancedMarkerElement({
		map: map,
		draggable: false,
		// little drop animation on the marker
		// now done with css
		// animation: google.maps.Animation.DROP,
		position: caldertextiles,
		title: "Calder Textiles",
	});

	const content = marker.content;

	content.style.opacity = "0";
	content.addEventListener("animationend", (event) => {
		content.classList.remove("drop");
		content.style.opacity = "1";
	});

	const delayTime = 1.5;
	content.style.setProperty("--delay-time", delayTime + "s");
	// observe the marker content
	intersectionObserver.observe(content);

	// the infoWindow (opens on clicking the marker)

	//  content for the infoWindow
	const infoWindowContent = `
		<h4>Calder Textiles</h4>
		<p>
			Dewsbury Mills<br />
			Thornhill Road<br />
			Dewsbury<br />
			WF12 9QE<br />
			United Kingdom
		</p>
	`;

	//  create the infoWindow
	const infowindow = new InfoWindow({
		content: infoWindowContent,
		ariaLabel: "Calder Textiles",
	});

	// open the infoWindow on marker's click event
	// NB addListener is a method of google map's event object
	marker.addListener("click", () => {
		infowindow.open({
			anchor: marker,
			map,
		});
	});
}

// now using advancedMarkerElement so animation uses css (in the Astro component) and intersection observer
const intersectionObserver = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			entry.target.classList.add("drop");
			intersectionObserver.unobserve(entry.target);
		}
	}
});

initMap();
