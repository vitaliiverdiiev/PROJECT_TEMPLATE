// --- --- --- ANIMATION --- --- --- //

// .ai - animated item
// .ai-nh - animaterd item not hide

const animItems = document.querySelectorAll("[data-ai], [data-ai-nr]");

if (animItems.length > 0) {
	window.addEventListener("scroll", aninOnScroll)
	function aninOnScroll(params) {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add("_active")
			} else {
				if (!animItem.attributes["data-ai-nr"]) {
					animItem.classList.remove("_active")
				}
			}
		}

		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return {
				top: rect.top + scrollTop,
				left: rect.left + scrollLeft
			}
		}
	}
	setTimeout(() => aninOnScroll(), 300)
}