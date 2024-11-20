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
                <div class="taskbox__name">
                    ${data.name}
                    <img class="taskbox__icon" src="/images/devImages/arrowr.svg" alt="Arrow Right" />
                </div>
            </div>`;
    }

    static tasksHTML(data) {
        return `
            <div class="taskbox__header">
                <h1 class="heading-primary taskbox__name-1">${data.name}</h1>
                <div class="taskbox__options">
                    <img src="/public/images/devImages/penpaper.svg" alt="Edit Image" />
                    <img src="/public/images/devImages/trashbin.svg" alt="Delete Image" />
                </div>
            </div>

                <div class="tasks__container">
                    ${data}
                </div>

                <div class="tasks__add-container">
                    <input type="text" class="tasks__add-input" placeholder="Write a Task..." />
                    <div class="tasks__add-icon">
                        <img src="/public/images/devImages/plus.svg" alt="Add Icon" />
                    </div>
                </div>
            </div>
            `;
    }
}
