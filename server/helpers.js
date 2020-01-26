//stopWords.txt gets turned into an object
const getStopWords = () => {
    const fs = require('fs');
    const words = fs.readFileSync('public/stopWords.txt').toString('utf-8');
    let stopWords = {};
    words.split('\n').forEach(i => stopWords[i] = true ); 
    return stopWords;
}

//book.txt (initially, littleWomen.txt) gets turned into a string for excerptMaker
const getBook = (bookFile) => {
    const fs = require('fs');
    bookToString = fs.readFileSync(bookFile).toString('utf-8');
    return bookToString;
}

//receives the book string and turns it into an excerpt
const excerptMaker = (text) => {
    let currentExcerpt = [];
    let arrOfExcerpts = []; 
    let currentWord = "";
    for(let i = 0; i < text.length; i++){
        if(currentExcerpt.length > 40 && currentExcerpt.length < 70 && (text[i] === "." || text[i] === "," || text[i] === ";")){
            currentExcerpt.push(currentWord);
            currentWord = ""
            arrOfExcerpts.push(currentExcerpt.join(" "));
            currentExcerpt = []
        } else if (currentExcerpt.length >= 70){
			currentExcerpt = [];
        } else if(currentExcerpt.length < 70 && text[i] !== " " && text[i] !== "\"" && text[i] !== "\r") {
            currentWord += text[i];
        } else if (text[i] === " "){
            currentExcerpt.push(currentWord);
            currentWord = "";
        }
    }
    return arrOfExcerpts;
}

//chooses which excerpt the user will see
const chooseExcerpt = (arrOfExcerpts) => {
    return arrOfExcerpts[Math.floor(Math.random() * arrOfExcerpts.length)];
}

//takes out stopWords from excerpt
const cleanStopWords = (excerpt, stopWords) => {
    const onlyLetters = excerpt.replace(/[^a-zA-Z]/gi, " ");
    const excerptArr = onlyLetters.split(" ")
    for (let i = 0; i < excerptArr.length; i++){
        if (stopWords.hasOwnProperty(excerptArr[i].toLowerCase())){
            excerptArr.splice(i, 1);
            i = i - 1
        }
    }
    return excerptArr;
}

//choose 10-15 random words to become the blanks in the game
const chooseWords = (cleanExcerptArr) => {
    const wordsChosen = []
    for(let i = 0; i < cleanExcerptArr.length * 0.4 ; i++){
        wordsChosen.push(cleanExcerptArr[Math.floor(Math.random() * cleanExcerptArr.length)]);
    }
    return wordsChosen;
}

// 1. I'll need to send these words in a queue to the api
// 2. then, when i get its value returned, need to do two things at a time
//      a. change the value of this word in the original text to be VERB/ADJ/NOUN and its index (VERB1, VERB2, ADJ1, VERB3)
//      b. send a request for these to be filled out.


module.exports =  {
  excerptMaker, 
  getStopWords, 
  cleanStopWords, 
  getBook, 
  chooseExcerpt,
  chooseWords,
};