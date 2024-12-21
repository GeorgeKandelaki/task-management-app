import axios from "axios";
import { showAlert } from "./alerts";

export async function createTaskBox(name) {
	try {
		const res = await axios({
			url: "http://95.104.13.159:3000/api/v1/taskbox",
			method: "POST",
			data: { name },
		});

		if (res.data.status == "Success") {
			showAlert("success", "Task Box was Successfully Created!", 3);
			return res.data;
		}
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}

export async function deleteTaskBox(id) {
	try {
		const res = await axios({
			url: `http://95.104.13.159:3000/api/v1/taskbox/${id}`,
			method: "DELETE",
		});

		return showAlert("success", "Task Box was deleted Successfully!", 3);
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}

export async function getAll() {
	try {
		const res = await axios({
			url: "http://95.104.13.159:3000/api/v1/taskbox",
			method: "GET",
		});

		if (res.data.status == "Success") return res.data;
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}

export async function updateTaskBox(id, updatedFields) {
	try {
		const res = await axios({
			url: `http://95.104.13.159:3000/api/v1/taskbox/${id}`,
			method: "PATCH",
			data: updatedFields,
		});

		if (res.data.status == "Success") {
			showAlert("success", "Task Box Updated Successfully!", 3);
			return res.data;
		}
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}
