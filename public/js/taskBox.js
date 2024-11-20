import axios from "axios";

export async function createTaskBox(name) {
    try {
        const res = await axios({
            url: "http://95.104.13.159:3000/api/v1/taskbox",
            method: "POST",
            data: { name },
        });

        if (res.data.status == "Success") return res.data;

        return false;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteTaskBox(id) {
    const res = await axios({
        url: "http://95.104.13.159:3000/api/v1/taskbox",
        method: "DELETE",
    });

    if (res.data.status == "Success") return;

    return false;
}

export async function getAll() {
    try {
        const res = await axios({
            url: "http://95.104.13.159:3000/api/v1/taskbox",
            method: "GET",
        });

        if (res.data.status == "Success") return res.data;

        return false;
    } catch (err) {
        console.log(err);
    }
}
