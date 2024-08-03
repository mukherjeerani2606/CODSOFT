const quoteElement = document.getElementById('quote');
const newQuoteBtn = document.getElementById('new-quote-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const shareBtn = document.getElementById('share-btn');
const favoritesList = document.getElementById('favorites-list');

const quotes = [
    "The best way to predict the future is to create it.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "Your time is limited, so don’t waste it living someone else’s life.",
    "The purpose of our lives is to be happy.",
    "Get busy living or get busy dying.",
    "Life is what happens when you’re busy making other plans.",
    "You only live once, but if you do it right, once is enough.",
    "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
    "To live is the rarest thing in the world. Most people exist, that is all.",
    "In three words I can sum up everything I’ve learned about life: it goes on.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "If you tell the truth, you don't have to remember anything.",
    "Without music, life would be a mistake.",
    "It is never too late to be what you might have been.",
    "Everything you can imagine is real.",
    "Do what you can, with what you have, where you are.",
    "Life isn't about finding yourself. Life is about creating yourself.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "To love and be loved is to feel the sun from both sides.",
    "The only impossible journey is the one you never begin.",
    "Believe you can and you're halfway there.",
    "Act as if what you do makes a difference. It does.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "The best revenge is massive success."
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayNewQuote() {
    const newQuote = getRandomQuote();
    quoteElement.textContent = newQuote;
}

newQuoteBtn.addEventListener('click', displayNewQuote);

favoriteBtn.addEventListener('click', () => {
    const quote = quoteElement.textContent;
    if (!quote) return;

    const li = document.createElement('li');
    li.textContent = quote;
    favoritesList.appendChild(li);
});

shareBtn.addEventListener('click', () => {
    const quote = quoteElement.textContent;
    if (!quote) return;

    if (navigator.share) {
        navigator.share({
            title: 'Quote of the Day',
            text: quote,
        });
    } else {
        alert('Share feature not supported on your device.');
    }
});

// Display a new quote on app launch
displayNewQuote();
