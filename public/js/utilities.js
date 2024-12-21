export function joinTemplate(arr, templateFn, join = true) {
	const newArr = arr.map((el) => templateFn(el));
	if (join) return newArr.join(" ");
	return newArr;
}

export function renderHTML(parentEl, html, pos, clear = false) {
	clear ? (parentEl.innerHTML = "") : false;

	parentEl.insertAdjacentHTML(pos, html);
	return;
}

export function removeActiveClass(selector, classname) {
	document.querySelectorAll(selector).forEach((el) => el.classList.remove(classname));
}

export function deleteByKey(arr, condition) {
	for (let i = 0; i < arr.length; i++) {
		if (condition(arr[i])) return arr.splice(i, 1);
	}

	return false;
}
