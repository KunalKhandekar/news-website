// For NavBar Active Class Add And Remove 
const list = document.querySelectorAll('li');
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
};

list.forEach((item) => item.addEventListener('click', activeLink));

// For getting Current Date 
let d = new Date();
let date = d.getDate();
let month = d.getMonth();
let year = d.getFullYear();
if (month < 10) {
    month = "0" + month;
};
if (date < 10) {
    month = "0" + month;
};
let currentDate = `${year}-${month}-${date}`; //current date

// takes date in number format and returns in readable form.
function articleDate(date) {
    const months = ['', "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = date.slice(5, 7);
    if (month < 10) {
        month = month.slice(1, 2)
    }
    return `${date.slice(8)} ${months[month]} ${date.slice(0, 4)}`;
}

function getRandomApiKey() {
    const apiKeys = [
        'pub_41226e1fc33524e19501892e58a293f622e53',
        'pub_4122923a03c0a20f6bb4289c9c5496b39d9b5',
        'pub_412319357f969a414c218d309488cc55d3fe4',
        'pub_4123227a7299c0362070b9ebc12abd45e8212',
        'pub_411949034fc5008b2401bebd97e969c70f544',
        'pub_41254b62fa044fa9321b72333ad753e2dfc92',
        'pub_41255e97a7f6ba942544514f308fc70fe5fef',
        'pub_412567659c6d66948c5849f0c4974046e9a2b',
        'pub_412570501c91261de21039ffefffca18bef9c',
        'pub_412592b2ff11f2b235b847a27b11f56496937',
        'pub_412605220dd2106104a8ffcdc3453c6ab934b'

    ];

    const randomIndex = Math.floor(Math.random() * apiKeys.length);
    return apiKeys[randomIndex];
}

// Example usage:

const url = 'https://newsdata.io/api/1/news?'; // Api Url

// window.addEventListener("load", () => fetchNews('india')); // FetchNews On Window load

// for NavBar Click 
async function clickonNav(q) {
    const article = document.getElementById('News-container');
    article.style.display = 'flex';
    await fetchNews(q);
}

// Async Function for Fetching News
async function fetchNews(query) {
    const ApiKey = getRandomApiKey();
    const response = await fetch(`https://newsdata.io/api/1/news?apikey=${ApiKey}&country=in&q=${query}&language=hi,en`);
    const data = await response.json();

    if (data.results.length === 0) {
        binderBot([], query, null, "Oops! Something went wrong."); // Pass an empty array and error message to binderBot
    } else {
        binderBot(data.results, query, data.nextPage, null);
    }
}


async function searchNews(query) {
    const ApiKey = getRandomApiKey();
    const response = await fetch(`https://newsdata.io/api/1/news?apikey=${ApiKey}&country=in&q=${query}&language=hi,en`);
    const data = await response.json();

    if (data.results.length === 0) {
        binderBot([], query, null, "Oops! No results found."); // Pass an empty array and error message to binderBot
    } else {
        binderBot(data.results, query, data.nextPage, null);
    }

    // To remove the active class from navbar
    const navList = document.getElementById("navbar-nav");
    const listItems = navList.getElementsByTagName("li");

    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove("active");
    }
}

function binderBot(results, query, nxtpg, errorMessage) {
    const NewsCont = document.getElementById("News-container");
    const errorContainer = document.getElementById("error-container");
    // Clear previous news cards
    NewsCont.innerHTML = '';

    if (errorMessage) {
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
            errorElement.textContent = errorMessage;
        } else {
            const newErrorMessage = document.createElement("p");
            newErrorMessage.id = "error-message";
            newErrorMessage.textContent = errorMessage;
            errorContainer.appendChild(newErrorMessage);
        }
        errorContainer.style.height = '90vh';
        errorContainer.style.visibility = 'visible';
        return;
    }

    if (!Array.isArray(results)) {
        document.querySelector('.btn').style.display = 'none';
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
            errorElement.textContent = "Something went wrong!!";
        } else {
            const newErrorMessage = document.createElement("p");
            newErrorMessage.id = "error-message";
            newErrorMessage.textContent = "Something went wrong!!";
            errorContainer.appendChild(newErrorMessage);
        }
        errorContainer.style.height = '90vh';
        errorContainer.style.visibility = 'visible';
        return;
    }

    errorContainer.style.height = '0vh';
    errorContainer.style.visibility = 'hidden';

    // Using for Each loop to itrate over each article. 
    results.forEach(result => {
        if (!result.image_url) return;
        if (!result.description) return;

        // for getting date in readable form 
        let articleD = articleDate(result.pubDate.slice(0, 10));

        // matches source name and images of source 
        let source_img = result.source_icon;

        let box = `<a href=${result.link} target="_blank"><div class="news-card" id="news-crd">
        <div class="news-head">
            <img src="${result.image_url}" alt="" id="news-img">
        </div>
        <div class="news-info">
            <div class="main-info">
                <h3 class="news-title">${result.title}</h3>
                <p class="news-desc">
                    ${result.description}</p>
            </div>
            <hr class="divider">
            <div class="source-time">
                <div class="source">
                    <img src=${source_img} alt="source" id="source-img">
                </div>
                <div class="time" id="time">
                    <span>${articleD}</span>
                </div>
            </div>
        </div>
    </div></a>`;

        // Append the News-Box to News-Container.
        NewsCont.innerHTML = NewsCont.innerHTML + box;
    });

};

/*=============== SEARCH BAR JS ===============*/
const toggleSearch = (search, button) => {
    const searchBar = document.getElementById(search);
    searchButton = document.getElementById(button)

    searchButton.addEventListener('click', () => {
        // We add the show-search class, so that the search bar expands
        searchBar.classList.toggle('show-search')
    });
};
toggleSearch('search-bar', 'search-button')

const form = document.getElementById('search-bar');
const input = document.getElementById('input_box');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    var q = input.value.trim(); // Trim whitespace from the input value
    if (!q) return; // If the input is empty, do nothing

    searchNews(q); // Call the searchNews function with the input value
    form.reset(); // Reset the form
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('show-search');
});





fetchNews('Latest news in India')