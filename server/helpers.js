//stopWords.txt gets turned into an object -- done
const getStopWords = () => {
    const fs = require('fs');
    const words = fs.readFileSync('public/stopWords.txt').toString('utf-8');
    let stopWords = {};
    words.split('\n').forEach(i => stopWords[i] = true ); 
    return stopWords
}

//takes out stopWords from excerpt -- done
const cleanStopWords = (excerpt, stopWords) => {
    const excerptArr = excerpt.split(" ")
    for (let i = 0; i < excerptArr.length; i++){
        if (stopWords.hasOwnProperty(excerptArr[i].toLowerCase())){
            excerptArr.splice(i, 1);
            i = i - 1
        }
    }
    return excerptArr.join(" ");
}

//gets a long text and turns it into an excerpt -- done
const excerptMaker = (text) => {
    let currentExcerpt = [];
    let arrOfExcerpts = []; 
    let currentWord = "";
    for(let i = 0; i < text.length; i++){
        if(currentExcerpt.length > 40 && currentExcerpt.length < 60 && (text[i] === "." || text[i] === ",")){
            console.log("if", currentExcerpt, "text[i]", text[i], "current", currentWord)
            currentExcerpt.push(currentWord);
            currentWord = ""
            arrOfExcerpts.push(currentExcerpt.join(" "));
            currentExcerpt = []
        } else if(currentExcerpt.length < 60 && text[i] !== " " && text[i] !== "\"") {
            currentWord += text[i];
        } else if (text[i] === " "){
            currentExcerpt.push(currentWord);
            currentWord = "";
        }
    }
    return arrOfExcerpts;
}

module.exports =  {excerptMaker, getStopWords, cleanStopWords};