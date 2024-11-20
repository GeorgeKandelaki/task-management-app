"use strict";

export class Task {
    constructor(task, id, taskBox) {
        this.task = task;
        this.completed = false;
        this.id = id;
        this.taskBox = taskBox;
    }

    update(updatedTask) {
        this.task = updatedTask;
        return;
    }

    static taskHTML(data) {
        return `
            <div class="task">
                <div class="task__content">
                    ${data.task}
                </div>
                <div class="task__button">
                    <input type="checkbox" class="task__checkbox" />
                    </div>
            </div>
        `;
    }
}
