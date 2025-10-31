import axios from "axios";
import { showAlert } from "./alerts";

export async function signup(name, email, password, passwordConfirm) {
    try {
        const res = await axios({
            url: "https://task-management-app-nbw3.onrender.com/api/v1/user/signup",
            method: "POST",
            data: {
                name,
                email,
                password,
                passwordConfirm,
            },
        });

        if (res.data.status == "Success") {
            showAlert("success", "You signed up successfully!", 5);
            return window.setTimeout(() => location.assign("/"), 1500);
        }
    } catch (err) {
        return showAlert("error", err.response.data.message);
    }
}
