// const fs = require('fs');
// const words = fs.readFileSync('../public/stopWords.txt').toString('utf-8');
// const textByLine = words.split('\n');


const excerptMaker = (text, arrOfExcerpts = []) => {
    let currentExcerpt = []
    for(let i = 0; i < text.length; i++){
        let currentWord = ""
        if(currentExcerpt.length <= 60 && text[i] !== " ") {
            currentWord += text[i]
        }
        else if(currentExcerpt.length > 45 && currentExcerpt.length < 70 && text[i] === "." || text[i - 1] === "." && text[i] === "\""){
            console.log(currentWord)
            arrOfExcerpts.push(currentWord.join(" "))
        } else if (text[i] === " "){
            currentExcerpt.push(currentWord)
        }
    }
    return arrOfExcerpts
}

module.exports =  excerptMaker ;