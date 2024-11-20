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
