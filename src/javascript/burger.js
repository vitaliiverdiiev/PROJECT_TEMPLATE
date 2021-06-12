document.querySelector(".burger").addEventListener("click", function (e) {
	this.classList.toggle("burger--active");
	document.querySelector(".nav__items").classList.toggle("_active");

// 	if (this.classList.contains("burger--active") && document.querySelector(".nav__items").classList.contains("nav__items--active")) {
// 		document.body.style.height = "100vh";
// 		document.body.style.overflow = "hidden";
// 	} else {
// 		document.body.style.height = "100%";
// 		document.body.style.overflow = "auto";
// 	}
// })

// document.querySelector("ul.nav__items").addEventListener("click", function (e) {
// 	document.querySelector(".burger").classList.toggle("burger--active");
// 	this.classList.toggle("nav__items--active");

// 	if (!this.classList.contains("burger--active") && !document.querySelector(".nav__items").classList.contains("nav__items--active")) {
// 		document.body.style.height = "100%";
// 		document.body.style.overflow = "auto"
// 	} else {
// 		null
// 	}
})