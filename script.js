const accessKey = "oqz9DxWd61QegvMAiK40kkVNTRFi-y3qltLneKscJTc";
const formel = document.querySelector("form");
const input = document.getElementById("Search_input");
const searchresult = document.querySelector(".search-results");
const showmore = document.getElementById("show");
let inputdata = "";
let page = 1;

async function searchimage() {
    inputdata = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page == 1) {
        searchresult.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imagelink);
        searchresult.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }
}

formel.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchimage();
});

showmore.addEventListener("click", () => {
    searchimage();
});
