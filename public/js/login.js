import axios from "axios";
import { showAlert } from "./alerts";

export async function login(email, password) {
	try {
		const res = await axios({
			url: "http://95.104.13.159:3000/api/v1/user/login",
			method: "POST",
			data: {
				email,
				password,
			},
		});

		if (res.data.status == "Success") {
			showAlert("success", "You logged in successfully!", 5);
			return window.setTimeout(() => location.assign("/"), 3000);
		}
	} catch (err) {
		return showAlert("error", err.response.data.message);
	}
}
