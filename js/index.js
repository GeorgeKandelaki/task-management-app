"use strict";

class TaskBox {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.quantity = this.tasks.length;
        this.id = String(Date.now()).slice(0, 11);
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
}

class Task {
    constructor(task) {
        this.task = task;
        this.completed = false;
        this.id = "Task" + String(Date.now()).slice(0, 11);
    }

    update(updatedTask) {
        this.task = updatedTask;
        return;
    }
}
