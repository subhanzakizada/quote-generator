// Elements
const quoteContainer = document.getElementById('quote-container')
const quoteTextEl = document.getElementById('quote')
const quoteAuthorEl = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
let counter = 0

// shows the Loader and hides the Quote container or opposite
const loadingShowOrHide = function() {
    quoteContainer.hidden = !quoteContainer.hidden
    loader.hidden = !loader.hidden
} 

// Get Quote from API
async function getQuote() {
    loadingShowOrHide()
    
    // this URL prevents error while accessing the API - which is common for free APIs because of the traffic -- CORS PROXY URL:
    const proxyURL = 'https://secret-ocean-49799.herokuapp.com/'

    // API url
    const quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        
        const response = await fetch(proxyURL + quoteURL)
        const data = await response.json()

        // if the quote is long, add "long-quote-text" class
        if (data.quoteText.length > 120) {
            quoteTextEl.classList.add('long-quote')
        } else {
            quoteTextEl.classList.remove('long-quote')
        }
        quoteTextEl.innerText = data.quoteText
        
        // if author is blank, set to "Unknown"
        if(data.quoteAuthor === '') {
            quoteAuthorEl.innerText = 'Unknown'
        } else {
            quoteAuthorEl.innerText = data.quoteAuthor
        }        
        counter = 0
        loadingShowOrHide()
    } catch (error) {
        if(counter < 5) getQuote()
        else {
            quoteAuthorEl.innerText = 'Couldn\'t get the data. Please try again in couple minutes.'
            loadingShowOrHide()
        }
    }
}

// Tweet Quote
const tweetQuote = function() {
    const twitterURL = 'https://twitter.com/intent/tweet'
    const quote = quoteTextEl.innerText
    const author = quoteAuthorEl.innerText
    
    window.open(`${twitterURL}?text=${quote} - ${author}`, '_blank')
}

// On Load
getQuote()

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)