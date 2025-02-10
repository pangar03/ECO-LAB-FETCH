const dataContainter = document.getElementById("data-container");
const animeData = document.getElementById("anime-data");

const firstApiBtn = document.getElementById("fetch-user").addEventListener("click", async () => {
    dataContainter.innerHTML = "";
    try {
        const loading = document.createElement("p");
        loading.textContent = "Loading...";
        dataContainter.appendChild(loading);

        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        console.log(data);

        const user = data.results[0];

        const userElement = document.createElement("div");
        userElement.innerHTML = `
            <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
            <h3>${user.gender}</h3>
            <h3>From: ${user.location.country}, ${user.location.state}, ${user.location.city}</h3>
            <h3>Post Code: ${user.location.postcode}</h3>
            <h3>Email: ${user.email}</h3>
        `;

        dataContainter.innerHTML = "";
        dataContainter.appendChild(userElement);
    } catch (error) {
        dataContainter.innerHTML = `
            <p>An error occurred while fetching the data.</p>
            <h5>${error}</h5>
        `;
        console.log(error);
    }
});

const secondApiBtn = document.getElementById("fetch-cat").addEventListener("click", async () => {
    dataContainter.innerHTML = "";
    try {
        const loading = document.createElement("p");
        loading.textContent = "Loading...";
        dataContainter.appendChild(loading);

        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();

        const catFact = data.fact;

        dataContainter.innerHTML = `
            <h3>CAT FACT: ${catFact}</h3>
        `;
    } catch (error) {
        dataContainter.innerHTML = `
            <p>An error occurred while fetching the data.</p>
            <h5>${error}</h5>
        `;
        console.log(error);
    }
});

const thirdApiForm = document.getElementById("anime-form").addEventListener("submit", async () => {
    event.preventDefault();
    animeData.innerHTML = "";
    const animeNumber = document.getElementById("number").value;
    const animeStatus = document.getElementById("status").value;
    const animeType = document.getElementById("type").value;

    try {
        const loading = document.createElement("p");
        loading.textContent = "Loading...";
        animeData.appendChild(loading);

        const response = await fetch(`https://api.jikan.moe/v4/anime?limit=${animeNumber}&status=${animeStatus}&type=${animeType}`);
        const result = await response.json();
        animeData.innerHTML = "";
        const data = result.data;

        data.forEach(anime => {
            const animeElement = document.createElement("div");
            animeElement.innerHTML = `
                <img src="${anime.images.webp.image_url}" />
                <h3>${anime.title}</h3>
                <h4>Type: ${anime.type}</h4>
                <h4>Source: ${anime.source}</h4>
                <h4>Status: ${anime.status}</h4>
            `;
            animeData.appendChild(animeElement);
        });

        console.log(data);
    } catch (error) {
        animeData.innerHTML = `
            <p>An error occurred while fetching the data.</p>
            <h5>${error}</h5>
        `;
        console.log(error);
    } 
});
