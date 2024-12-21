"use strict";
import { Task } from "./taskClass";
import { joinTemplate } from "./utilities";

export class TaskBox {
	constructor(name, id, user) {
		this.user = user;
		this.name = name;
		this.tasks = [];
		this.quantity = this.tasks.length;
		this.id = id;
		this.createdAd = Date.now();
	}

	search(taskId) {
		return this.tasks.find((task) => task.id === taskId);
	}

	add(task) {
		this.tasks.push(task);
		this.quantity++;
		return;
	}

	remove(task) {
		this.quantity--;

		for (let i = 0; i < this.tasks.length; i++) {
			if (task == this.tasks[i]) {
				this.tasks.splice(i, 1);
				break;
			}
		}

		return;
	}

	taskBoxHTML(data) {
		return `
            <div class="taskbox">
                <div class="taskbox__name" id="${data.id}">
                    ${data.name}
                    <img class="taskbox__icon" src="/images/devImages/arrowr.svg" alt="Arrow Right" />
                </div>
            </div>`;
	}

	static tasksHTML(data) {
		return `
            <div class="taskbox__header">
                <h1 class="heading-primary taskbox__name-1">${data.name}</h1>
				<div class="taskbox__edit content--disable">
					<input type="text" class="taskbox__edit-input" placeholder="Edit a task box name..." />
					<img class="taskbox__edit-input-icon" src="/images/devImages/plus.svg" alt="Add Icon" />
				</div>
                <div class="taskbox__options">
                    <img src="/images/devImages/penpaper.svg" alt="Edit Image" class="taskbox__edit-icon" />
                    <img src="/images/devImages/trashbin.svg" alt="Delete Image" class="taskbox__delete-icon" />
                </div>
            </div>

            <div class="tasks__container">
                ${
					data.tasks.length
						? joinTemplate(data.tasks, Task.taskHTML, true)
						: `<div class="tasks__empty"></div>`
				}
            </div>

            <div class="tasks__add-container">
                <input type="text" class="tasks__add-input" placeholder="Write a Task..." />
                <div class="tasks__add-box">
                    <img class="tasks__add-icon" src="/images/devImages/plus.svg" alt="Add Icon" />
                </div>
            </div>
        </div>
        `;
	}
}
