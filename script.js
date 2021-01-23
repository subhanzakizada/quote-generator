// Get Quote from API
async function getQuote() {
    // this URL prevents error while accessing to API - which is common for free APIs 
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    
    // API url
    const quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(quoteURL)
        const data = await response.json()
    } catch (error) {
        console.log(`whoops, no quote: ${error}`)
    }
}

getQuote()