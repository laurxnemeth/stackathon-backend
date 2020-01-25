const getStopWords = () => {
    const fs = require('fs');
    const words = fs.readFileSync('public/stopWords.txt').toString('utf-8');
    let stopWords = {};
    words.split('\n').forEach(i => stopWords[i] = true ); 
    return stopWords
}

const cleanStopWords = (excerpt, stopWords) => {
    const currentWord = ""
    
}

const excerptMaker = (text, arrOfExcerpts = []) => {
    let currentExcerpt = []
    for(let i = 0; i < text.length; i++){
        let currentWord = ""
        if(currentExcerpt.length > 45 && currentExcerpt.length < 70 && text[i] === "." || text[i - 1] === "." && text[i] === "\""){
            console.log(currentWord)
            arrOfExcerpts.push(currentExcerpt.join(" "))
        } else if(currentExcerpt.length <= 45 && text[i] !== " ") {
            currentWord += text[i]
        } else if (text[i] === " "){
            currentExcerpt.push(currentWord)
        }
    }
    return arrOfExcerpts
}

module.exports =  {excerptMaker, getStopWords};