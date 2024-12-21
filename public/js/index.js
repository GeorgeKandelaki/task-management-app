"use strict";
import { login } from "./login";
import { signup } from "./signup";
import { getAll, createTaskBox, deleteTaskBox, updateTaskBox } from "./taskBox";
import { addTask, deleteTask, updateTask } from "./task";
import { updateUser, deleteUser } from "./user";

import { TaskBox } from "./taskBoxClass";
import { Task } from "./taskClass";
import { renderHTML, removeActiveClass, deleteByKey } from "./utilities";

const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const updateUserForm = document.querySelector(".profile__form-update");
const changePasswordForm = document.querySelector(".profile__form-password");

const btnAddTaskBox = document.querySelector(".task-manager__add-icon");
const btnDeleteAccount = document.querySelector(".btn--delete-acc");

const overview = document.querySelector(".overview");

let taskBoxes = [];
let activeTaskBox;

if (loginForm) {
	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const { value: email } = document.querySelector(".form__email");
		const { value: password } = document.querySelector(".form__password");

		login(email, password);
		return;
	});
}

if (signupForm) {
	signupForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const { value: name } = document.querySelector(".form__name");
		const { value: email } = document.querySelector(".form__email");
		const { value: password } = document.querySelector(".form__password");
		const { value: passwordConfirm } = document.querySelector(".form__password-confirm");

		signup(name, email, password, passwordConfirm);
		return;
	});
}

if (btnAddTaskBox) {
	btnAddTaskBox.addEventListener("click", async () => {
		const tasksManager = document.querySelector(".task-manager__container");
		const input = document.querySelector(".task-manager__add-input");
		const { value: value } = input;
		value.trim();
		input.value = "";

		const {
			data: { data },
		} = await createTaskBox(value);
		const taskBox = new TaskBox(value, data.id, data.user);

		taskBoxes.push(taskBox);
		renderHTML(tasksManager, taskBox.taskBoxHTML(taskBox), "afterbegin");

		return;
	});
}

if (updateUserForm) {
	updateUserForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = document.getElementById("name");
		const email = document.getElementById("email");

		const updatedFields = {};
		const updatedString = [];

		if (name) {
			updatedFields.name = name.value;
			updatedString.push("name");
		}
		if (email) {
			updatedFields["email"] = email["value"];
			updatedString.push("email");
		}

		updateUser(updatedFields, updatedString.join(","));
		return;
	});
}

if (changePasswordForm) {
	changePasswordForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const { value: currentPassword } = document.getElementById("current-password");
		const { value: newPassword } = document.getElementById("new-password");
		const { value: passwordConfirm } = document.getElementById("new-password-confirm");

		const data = {
			currentPassword,
			newPassword,
			passwordConfirm,
		};

		updateUser(data, "password");
		return;
	});
}

if (btnDeleteAccount) btnDeleteAccount.addEventListener("click", (e) => deleteUser());

document.body.addEventListener("click", async (e) => {
	const { target } = e;

	if (target.matches(".taskbox__name") || target.matches(".taskbox__content")) {
		const { id } = target.closest(".taskbox__name");
		if (activeTaskBox && activeTaskBox.id == id) return;

		const tasks = document.querySelector(".tasks");

		removeActiveClass(".taskbox__name", "taskbox--active");
		target.closest(".taskbox__name").classList.add("taskbox--active");

		const taskBox = taskBoxes.find((el) => el.id == id);
		activeTaskBox = taskBox;

		renderHTML(tasks, TaskBox.tasksHTML(activeTaskBox), "beforeend", true);

		return;
	}

	if (!activeTaskBox) return;
	if (target.matches(".tasks__add-icon")) {
		const tasksContainer = document.querySelector(".tasks__container");
		const taskInput = document.querySelector(".tasks__add-input");
		const taskValue = taskInput.value.trim();

		taskInput.value = "";

		const {
			data: { data },
		} = await addTask(taskValue, activeTaskBox.id);
		const task = new Task(data.task, data.id, data.taskBox);

		activeTaskBox.tasks.push(task);

		if (activeTaskBox.tasks.length == 1) document.querySelector(".tasks__empty").remove();
		renderHTML(tasksContainer, task.createTaskHTML(task), "beforeend");

		return;
	}

	if (target.matches(".taskbox__delete-icon")) {
		deleteTaskBox(activeTaskBox.id);
		deleteByKey(taskBoxes, (el) => el.id == activeTaskBox.id);

		const taskBox = document.getElementById(activeTaskBox.id).parentElement;
		taskBox.remove();

		const tasks = document.querySelector(".tasks");
		tasks.innerHTML = '<div class="tasks__empty"></div>';
		activeTaskBox = null;
		console.log(activeTaskBox);
		return;
	}

	if (target.matches(".taskbox__edit-icon")) {
		const taskboxName = document.querySelector(".taskbox__name-1");
		const inputBox = document.querySelector(".taskbox__edit");
		const input = inputBox.querySelector(".taskbox__edit-input");

		inputBox.classList.toggle("content--disable");
		input.value = activeTaskBox.name;
		taskboxName.classList.toggle("content--disable");
	}

	if (target.matches(".taskbox__edit-input-icon")) {
		const taskboxName = document.querySelector(".taskbox__name-1");
		const taskboxName1 = document.getElementById(activeTaskBox.id);
		const inputBox = document.querySelector(".taskbox__edit");
		const input = inputBox.querySelector(".taskbox__edit-input");

		const { data: updatedTaskBox } = await updateTaskBox(activeTaskBox.id, { name: input.value });

		activeTaskBox.name = updatedTaskBox.data.name;
		taskboxName.textContent = taskboxName1.textContent = activeTaskBox.name;
		inputBox.classList.toggle("content--disable");
		taskboxName.classList.toggle("content--disable");

		return;
	}

	if (target.matches(".task__checkbox")) {
		// TODO Update the Task Completion to True in taskBoxes array, to whichever Task box it belongs to.

		let isChecked = false;
		if (target.checked == false) isChecked = false;
		else isChecked = true;

		const task = target.closest(".task");
		const taskContent = task.querySelector(".task__content");
		const { id } = task;

		const updatedTask = await updateTask(id, { completed: isChecked });
		taskContent.classList.toggle("task--completed");

		return;
	}

	if (target.matches(".task__delete-icon")) {
		const tasks = document.querySelector(".tasks__container");
		const task = target.closest(".task");
		const { id } = task;

		if (activeTaskBox.tasks.length) tasks.innerHTML = '<div class="tasks__empty"></div>';

		await deleteTask(id);
		task.remove();

		return;
	}

	if (target.matches(".task__edit-icon")) {
		const task = target.closest(".task");

		const taskText = task.querySelector(".task__text");
		const taskContent = task.querySelector(".task__content");

		const inputBox = task.querySelector(".task__edit");
		const input = inputBox.querySelector(".task__edit-input");

		taskContent.classList.toggle("content--disable");
		inputBox.classList.toggle("content--disable");
		input.value = taskText.innerText;
	}

	if (target.matches(".task__edit-input-icon")) {
		const task = target.closest(".task");
		const { id } = task;

		const inputBox = task.querySelector(".task__edit");
		const input = inputBox.querySelector(".task__edit-input");

		const taskText = task.querySelector(".task__text");
		const taskContent = task.querySelector(".task__content");

		const { data } = await updateTask(id, { task: input.value });
		taskText.textContent = data.data.task;

		taskContent.classList.remove("content--disable");
		inputBox.classList.add("content--disable");
	}
});

async function init() {
	if (!overview) return;
	const data = await getAll();
	taskBoxes = data.data.data;
}
init();
