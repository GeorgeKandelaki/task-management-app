import axios from "axios";
import { showAlert } from "./alerts";

export async function updateUser(data, type) {
	try {
		const url =
			type === "password"
				? "http://95.104.13.159:3000/api/v1/user/change_Password"
				: "http://95.104.13.159:3000/api/v1/user/update_me";

		const res = await axios({
			method: "PATCH",
			url,
			data,
		});

		if (res.data.status == "Success")
			return showAlert("success", `${type.toUpperCase()} was updated successfully!`);
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}

export async function deleteUser() {
	try {
		const res = await axios({
			url: "http://95.104.13.159:3000/api/v1/user/delete_me",
			method: "DELETE",
		});

		showAlert("success", "Account was successfully deleted!", 1500);
		return window.setTimeout(() => location.assign("/signup"), 2000);
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}
