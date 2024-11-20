import axios from "axios";

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

        if (res.data.status == "Success") window.setTimeout(() => location.assign("/"), 3000);

        return res.data;
    } catch (err) {
        console.log(err);
    }
}
