"use strict";

export class Task {
	constructor(task, id, taskBox) {
		this.task = task;
		this.completed = false;
		this.id = id;
		this.taskBox = taskBox;
		this.createAt = Date.now();
	}

	update(updatedTask) {
		this.task = updatedTask;
		return;
	}

	createTaskHTML(data) {
		return `
            <div class="task" id="${data.id}">
                <div class="task__content ${data.completed ? "task--completed" : " "}">
                    <div class="task__button">
                        <input type="checkbox" ${data.completed ? "checked" : ""} class="task__checkbox" />
                        <span class="task__checkmark"></span>
                    </div>

                    <p class="task__text">${data.task}</p>
                </div>

                <div class="task__edit content--disable">
					<input type="text" class="task__edit-input" placeholder="Edit a task box name..." />
					<img class="task__edit-input-icon" src="/images/devImages/plus.svg" alt="Add Icon" />
				</div>

                <div class="task__options">
                    <img src="/images/devImages/penpaper.svg" alt="Edit Image" class="task__edit-icon" />
                    <img src="/images/devImages/trashbin.svg" alt="Delete Image" class="task__delete-icon" />
                </div>

            </div>
    `;
	}

	static taskHTML(data) {
		return `
            <div class="task" id="${data.id}">
                <div class="task__content ${data.completed ? "task--completed" : " "}">
                    <div class="task__button">
                        <input type="checkbox" ${data.completed ? "checked" : ""} class="task__checkbox" />
                        <span class="task__checkmark"></span>
                    </div>

                    <p class="task__text">${data.task}</p>
                </div>

                <div class="task__edit content--disable">
					<input type="text" class="task__edit-input" placeholder="Edit a task box name..." />
					<img class="task__edit-input-icon" src="/images/devImages/plus.svg" alt="Add Icon" />
				</div>

                <div class="task__options">
                    <img src="/images/devImages/penpaper.svg" alt="Edit Image" class="task__edit-icon" />
                    <img src="/images/devImages/trashbin.svg" alt="Delete Image" class="task__delete-icon" />
                </div>
            </div>
        `;
	}
}
