"use strict";
import { showAlert } from "./alerts";
import { login } from "./login";
import { signup } from "./signup";
import { getAll, createTaskBox } from "./taskBox";

import { TaskBox } from "./taskBoxClass";
import { Task } from "./taskClass";
import { renderHTML, removeActiveClass } from "./utilities";

const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");

const btnAddTaskBox = document.querySelector(".task-manager__add-icon");

let taskBoxes = [];
let activeTaskBox;

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const { value: email } = document.querySelector(".form__email");
        const { value: password } = document.querySelector(".form__password");

        return login(email, password);
    });
}

if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const { value: name } = document.querySelector(".form__name");
        const { value: email } = document.querySelector(".form__email");
        const { value: password } = document.querySelector(".form__password");
        const { value: passwordConfirm } = document.querySelector(".form__password-confirm");

        return signup(name, email, password, passwordConfirm);
    });
}

btnAddTaskBox.addEventListener("click", async () => {
    const input = document.querySelector(".task-manager__add-input");
    const { value: value } = input;
    value.trim();

    if (!input || value.length < 4)
        return showAlert("error", "Task Box name can't be empty yer cunt or less than 4 characters!");

    input.value = "";

    const {
        data: { data },
    } = await createTaskBox(value);
    const taskBox = new TaskBox(value, data.id, data.user);

    taskBoxes.push(taskBox);
    renderHTML(document.querySelector(".task-manager__container"), taskBox.taskBoxHTML(taskBox), "afterbegin");

    return;
});

document.body.addEventListener("click", (e) => {
    const { target } = e;

    if (target.matches(".taskbox__name") || target.matches(".taskbox__content")) {
        removeActiveClass(".taskbox__name", "taskbox--active");
        target.closest(".taskbox__name").classList.add("taskbox--active");

        const taskBox = taskBoxes.find((el) => el.id == target.id);
        activeTaskBox = taskBox;
        console.log(taskBox);
    }
});

async function init() {
    const data = await getAll();
    taskBoxes = data.data.data;
}
init();
