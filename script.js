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

// Comparing Source Name And Source Images 
function getSourceImg(article) {
    let source_img = '';
    if (article.source.name == "The Times of India") {
        source_img = './images/indiatimes.webp'
    }
    else if (article.source.name == "NDTV News") {
        source_img = './images/NDTV.jpg'
    }
    else if (article.source.name == "Livemint") {
        source_img = './images/livemint-logo.png'
    }
    else if (article.source.name == "India.com") {
        source_img = './images/indiatoday.png'
    }
    else if (article.source.name == "Hindustan Times") {
        source_img = './images/hindustantimes.avif'
    }
    else if (article.source.name == "News18") {
        source_img = './images/News_18_India.png'
    }
    else if (article.source.name == "Abplive.com") {
        source_img = './images/abp.png'
    }
    else (
        source_img = "https://png.pngtree.com/element_our/sm/20180516/sm_5afc4cd0dcaca.jpg"
    )
    return source_img;
}
// 6b1d7a6f7e9d428fba7cdf346f2ecdfb
// 428004b880154e6984a712527d4823fe

const ApiKey = '4e603ad562ef4f1eab80c1228c918eaa'; //API Key
const url = 'https://newsapi.org/v2/everything?'; // Api Url

window.addEventListener("load", () => fetchNews('india')); // FetchNews On Window load

// for NavBar Click 
async function clickonNav(q) {
    const article = document.getElementById('News-container');
    article.style.display = 'flex';
    await fetchNews(q);
}

// Async Function for Fetching News
async function fetchNews(query) {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&domains=ndtv.com,hindustantimes.com,indiatimes.com,indiatoday.in,news18.com,india.com,abplive.com,livemint.com&sortby=publishedAt&apiKey=${ApiKey}`);
    const data = await response.json();
    binderBot(data.articles);
};

async function searchNews(query) {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&sortby=publishedAt&apiKey=${ApiKey}`);
    const data = await response.json();

    if (data.articles.length === 0) {
        binderBot([]);
    } else {
        binderBot(data.articles);
    }

    // To remove the active class from navbar
    const navList = document.getElementById("navbar-nav");
    const listItems = navList.getElementsByTagName("li");

    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove("active");
    }
    
}

function binderBot(articles) {
    const NewsCont = document.getElementById("News-container");
    const errorContainer = document.getElementById("error-container");

    // Clear previous news cards
    NewsCont.innerHTML = '';

    // if nothing in articles than show a search error.
    if (articles.length === 0) {
        const errorMessage = document.getElementById("error-message");
        const video = document.getElementById('videoNews');
        if (errorMessage) {
            errorMessage.textContent = "Oops! No results found.";
        } else {
            const newErrorMessage = document.createElement("p");
            newErrorMessage.id = "error-message";
            newErrorMessage.textContent = "No results found.";
            errorContainer.appendChild(newErrorMessage);
        }
        video.style.display = "none";
        errorContainer.style.height = '90vh';
        errorContainer.style.visibility = 'visible';
        return;
    }
    errorContainer.style.height = '0vh';
    errorContainer.style.visibility = 'hidden';

    // Using for Each loop to itrate over each article. 
    articles.forEach(article => {
        if (!article.urlToImage) return;

        // for getting date in readable form 
        let articleD = articleDate(article.publishedAt.slice(0, 10));

        // matches source name and images of source 
        let source_img = getSourceImg(article);

        let box = `<a href=${article.url} target="_blank"><div class="news-card" id="news-crd">
        <div class="news-head">
            <img src="${article.urlToImage}" alt="" id="news-img">
        </div>
        <div class="news-info">
            <div class="main-info">
                <h3 class="news-title">${article.title}</h3>
                <p class="news-desc">
                    ${article.description}</p>
            </div>
            <hr class="divider">
            <div class="source-time">
                <div class="source">
                    <img src=${source_img} alt="source" id="source-img">
                    <span id="source-name">${article.source.name}</span>
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
    })
}
toggleSearch('search-bar', 'search-button')

const form = document.getElementById('search-bar');
const input = document.getElementById('input_box');
input.addEventListener('keyup', function (event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        document.querySelector('form').submit();
        var q = input.value;
    }
    if (!q) return;
    searchNews(q);
    form.reset();
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('show-search');
});

// for newsvideo container drag 
function scroll(container) {
    const slider = document.getElementById(container);
    let mouseDown = false;
    let startX, scrollLeft;

    let startDragging = function (e) {
        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    };
    let stopDragging = function (event) {
        mouseDown = false;
    };

    slider.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (!mouseDown) { return; }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
    });

    // Add the event listeners
    slider.addEventListener('mousedown', startDragging, false);
    slider.addEventListener('mouseup', stopDragging, false);
    slider.addEventListener('mouseleave', stopDragging, false);
}

scroll('ndtv')
scroll('abp')
scroll('timesofindia')
scroll('Tv9')
scroll('hindustan_times')


function videoNews() {
    const video = document.getElementById('videoNews');
    const article = document.getElementById('News-container');
    article.style.display = 'none';
    video.style.display = 'block';
}