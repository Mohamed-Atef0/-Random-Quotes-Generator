const generateBtn = document.querySelector(".generate");
const autoBtn = document.querySelector(".auto");
const stopBtn = document.querySelector(".stop");
const quoteDiv = document.querySelector(".quote-display");
const quoteId = document.querySelector(".quotes-id");
const autoStatus = document.querySelector(".auto-status");
let intervalid = null;
let quotes = [];

async function getQoutes() {
  try {
    const response = await fetch("quotes.json");
    if (!response.ok) {
      throw new Error("Failed to load quotes");
    }
    const data = await response.json();
    // console.log(data);
    quotes = data;
    // console.log(quotes);
  } catch (error) {
    console.log(error.message);
  }
}

function generateQuote() {
  if (quotes.length === 0) return;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDiv.textContent = quote.text;
  quoteId.textContent = quote.id;
}

function startAutoPlay() {
  if (intervalid !== null) return;
  intervalid = setInterval(generateQuote, 2000);
  autoStatus.textContent = `Auto: ON`;
}

function stopAutoPlay() {
  clearInterval(intervalid);
  intervalid = null;
  autoStatus.textContent = "Auto : OFF";
}

generateBtn.onclick = generateQuote;
autoBtn.onclick = startAutoPlay;
stopBtn.onclick = stopAutoPlay;
getQoutes();
