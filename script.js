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

const ApiKey = '428004b880154e6984a712527d4823fe'; //API Key
const url = 'https://newsapi.org/v2/everything?'; // Api Url
window.addEventListener("load", () => fetchNews('india')); // FetchNews On Window load

// for NavBar Click 
async function clickonNav(q) {
    await fetchNews(q);
}

// Async Function for Fetching News
async function fetchNews(query) {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&domains=ndtv.com,hindustantimes.com,indiatimes.com,indiatoday.in,news18.com,india.com,abplive.com,livemint.com&sortby=publishedAt&apiKey=${ApiKey}`);
    const data = await response.json();
    binderBot(data.articles);
};

// Takes Fetched Data And Append it to News Container.
function binderBot(articles) {
    const NewsCont = document.getElementById("News-container");
    NewsCont.innerHTML = ''; // Makes Whole Container Empty.

    // Using for Each loop to itrate over each article. 
    articles.forEach(article => {
        if (!article.urlToImage) return;
        let box = `<div class="news-card">
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
                    <img src="https://cdn-icons-png.flaticon.com/512/21/21601.png" alt="source" id="source-img">
                    <span id="source-name">${article.source.name}</span>
                </div>
                <div class="time" id="time">
                    <span>${article.publishedAt.slice(0, 10)}</span>
                </div>
            </div>
        </div>
    </div>`

        // Append the News-Box to News-Container.
        NewsCont.innerHTML = NewsCont.innerHTML + box;
    });
};
