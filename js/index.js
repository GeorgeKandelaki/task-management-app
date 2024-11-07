"use strict";

class TaskBox {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.quantity = this.tasks.length;
    }

    addToTasks(task) {
        this.tasks.push(task);
        this.quantity++;
    }

    remove(task) {
        this.quantity--;

        for (let i = 0; i < this.tasks.length; i++) {
            if (task == this.tasks[i]) {
                this.tasks.splice(i, 1);
            }
        }
    }
}

class Task {
    constructor(task) {
        this.task = task;
        this.completed = false;
    }
}
