async function getAllUniversities() {
    const url =
        "https://bursary-api-1709020026838.azurewebsites.net/university/all";
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            return data;
        })
        .catch((err) => console.log(err));//alert
}


