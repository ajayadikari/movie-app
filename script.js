const inputs = document.querySelectorAll('input');
const key = inputs[0];
const searchTerm = inputs[1];
const grid = document.querySelector('.cardCont');
const spinnerEl = document.createElement('img')
const btn = document.querySelector('.btn');
searchTerm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") activate();
});
btn.addEventListener('click', ()=>activate())

function activate() {
    grid.innerHTML = "";
    if (key.value === '' || searchTerm.value === '') {
        alert("Please enter the required fields")
        return;
    }
    populateGrid(key.value, searchTerm.value);
    spinnerEl.src = `./New Folder/Rolling-1s-200px.svg`
    grid.appendChild(spinnerEl);
}

function populateGrid(key, value) {
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=${key}`)
        .then((response) => response.json())
        .then((data) => {
            gridHelper(data);
        })
        .catch(() => {
            grid.innerHTML = "";
            alert('Your API key or Movie name might be wrong. Please try again later.')
            console.log("failed");
        });

}

function gridHelper(data) {
    grid.removeChild(spinnerEl)
    const list = data.Search;
    list.map(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = item.Poster;
        const imgEl = document.createElement('img');
        imgEl.src = `${img}`
        card.appendChild(imgEl);
        const desc = document.createElement("div");
        desc.classList.add('desc');
        const title = document.createElement('p');
        title.textContent = `${item.Title}`;
        desc.appendChild(title);
        const year = document.createElement('p');
        year.textContent = `${item.Year}`;
        desc.appendChild(year);
        const imdbID = document.createElement('p');
        imdbID.textContent = `${item.imdbID}`
        desc.appendChild(imdbID);
        const type = document.createElement('p');
        type.textContent = `${item.Type}`
        desc.appendChild(type);
        card.appendChild(desc);
        grid.append(card);
    })
}
