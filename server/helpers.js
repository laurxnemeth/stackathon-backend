const excerptMaker = (text, arrOfExcerpts = []) => {
    let currentExcerpt = []
    for(let i = 0; i < text.length; i++){
        let currentWord = ""
        if(currentExcerpt.length <= 60 && text[i] !== " ") {
            currentWord += text[i]
        }
        else if(currentExcerpt.length > 45 && currentExcerpt.length < 70 && text[i] === "." || text[i - 1] === "." && text[i] === "\""){
            arrOfExcerpts.push(currentWord.join(" "))
        } else if (text[i] === " "){
            currentExcerpt.push(currentWord)
        }
    }
    console.log(arrOfExcerpts);
}

module.exports = {excerptMaker}