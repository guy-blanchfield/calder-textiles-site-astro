import AOS from "aos";
import "aos/dist/aos.css";

// AOS.init();

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	AOS.init({
		disable: true,
	});
} else {
	AOS.init({
		disable: "mobile",
	});
}
