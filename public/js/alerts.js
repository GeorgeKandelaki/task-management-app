export function hideAlert() {
    const alertEl = document.querySelector(".alert");
    if (alertEl) document.body.removeChild(alertEl);
    return;
}

export function showAlert(type, msg, time = 7) {
    hideAlert();

    const alert = `<div class="alert alert--${type}">${msg}</div>`;
    document.body.insertAdjacentHTML("beforeend", alert);
    window.setTimeout(() => hideAlert(), time * 1000);
    return;
}
