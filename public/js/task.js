import axios from "axios";
import { showAlert } from "./alerts";

export async function addTask(task, taskBoxId) {
	try {
		const res = await axios({
			url: "http://95.104.13.159:3000/api/v1/tasks",
			method: "POST",
			data: {
				taskBox: taskBoxId,
				task,
			},
		});

		if (res.data.status == "Success") return res.data;

		return false;
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}

export async function deleteTask(taskId) {
	try {
		const res = await axios({
			url: `http://95.104.13.159:3000/api/v1/tasks/${taskId}`,
			method: "DELETE",
		});

		return showAlert("success", "Task Was Successfully Deleted!");
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}

export async function updateTask(id, updatedFields) {
	try {
		const res = await axios({
			url: `http://95.104.13.159:3000/api/v1/tasks/${id}`,
			method: "PATCH",
			data: updatedFields,
		});

		if (res.data.status == "Success") return res.data;
		// showAlert("success", "Task Was Successfully Updated!");

		return False;
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}
