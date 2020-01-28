const axios = require('axios');
const key = require('../secrets.js');

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

//for the database: receives the book string and turns it into an excerpt
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
const chooseExcerpt = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

//takes out stop words from excerpt
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

//choose random words to become the blanks in the game
const chooseWords = (cleanExcerptArr) => {
    const wordsChosen = []
    for(let i = 0; i < cleanExcerptArr.length * 0.6 ; i++){
        wordsChosen.push(cleanExcerptArr[Math.floor(Math.random() * cleanExcerptArr.length)]);
    }
    return wordsChosen;
}

//get the type of word from the dictionary api
const buildDict = async (arr) => {
    try {
        let wordsDict = {};
        for (let i = 0; i < arr.length; i++){
            let response = await axios.get(
				`https://dictionaryapi.com/api/v3/references/collegiate/json/${arr[i]}?key=${key}`
		    );
            wordsDict[arr[i]] = response.data[0].fl
        }
    return wordsDict
    } catch (error) {
        console.log("oops")
    }
}

module.exports =  {
  excerptMaker, 
  getStopWords, 
  cleanStopWords, 
  getBook, 
  chooseExcerpt,
  chooseWords,
  buildDict,
};