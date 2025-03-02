const myViewFinderArray = [];
class ViewFinder {
    constructor(title, imagePath, description, author, year) {
        this.title = title;
        this.imagePath = imagePath;
        this.description = description;
        this.author = author;
        this.year = year;
    }
    toHTML() {
        return `
            <h2>${this.title}</h2>
            <img src="${this.imagePath}" alt="${this.title}">
            <p><strong>Description:</strong> ${this.description}</p>
            <p><strong>Author:</strong> ${this.author}</p>
            <p><strong>Year:</strong> ${this.year}</p>
        `;
    }
}

function initializeArray() {
    const viewFinder1 = new ViewFinder(
        "A Sunset",
        "images/sunset.jpg",
        "A beautiful sunset over the ocean and a beach with golden and  purple hues.",
        "AI",
        "2025"
    );
    const viewFinder2 = new ViewFinder(
        "Mountain Majesty",
        "images/mountain.jpg",
        "Snow-capped mountains under a cloudy blue sky.",
        "Ama dablam,",
        "2017"
    );
    const viewFinder3 = new ViewFinder(
        "City",
        "images/city.jpg",
        "A bustling cityscape at sunset, full of vibrant lights.",
        "AI",
        "2025"
    );
    const viewFinder4 = new ViewFinder(
        "Forest",
        "images/forest.jpg",
        "Forest with sun rays coming through the trees.",
        "Valiphotos",
        "2015"
    );
    const viewFinder5 = new ViewFinder(
        "Desert Dunes",
        "images/desert.jpg",
        "Rolling sand dunes under a scorching sun.",
        "AI",
        "2025"
    );
    const viewFinder6 = new ViewFinder(
        "Oops",
        "images/default.jpg",
        "view finder of defualt.",
        "AI",
        "2025"
    );
   
    myViewFinderArray.push(viewFinder1, viewFinder2, viewFinder3, viewFinder4, viewFinder5);
}


function displayRandomViewFinder() {
    const randomIndex = Math.floor(Math.random() * myViewFinderArray.length);
    const selectedViewFinder = myViewFinderArray[randomIndex];
    document.getElementById("display").innerHTML = selectedViewFinder.toHTML();
}


window.onload = initializeArray;
