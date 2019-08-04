import he from 'he'
export class questionTrueFalse{
        constructor(questionString, difficulty, category, correctAnswer){
            this.questionString= questionString
            this.correctAnswer= correctAnswer
            this.selectedAnswer= null // temp int 0 until used
            this.difficulty= difficulty
            this.category=category
            this.type = "boolean"
        }

    
}
export class questionMultipleChoice{
    constructor(questionString, difficulty, category, answers, correctAnswer){
        this.questionString= questionString
        this.correctAnswer= this.decode(correctAnswer)
        this.answers = this.decodeAnswers(answers)
        this.selectedAnswer= null // set to integer 0 as placeholder until used
        this.difficulty= difficulty
        this.category=category
        this.type = "multiple"
    }

    addCorrectAnswer = (answers) => {
        return answers.push(this.correctAnswer)
    }

    decodeAnswers = (answers) => { // loop through answers array and decode to txt string
        let decodedAnswers = []
        answers.forEach(answer => {
            let decoded = this.decode(answer)
            decodedAnswers.push(decoded)
        })
        decodedAnswers.push(this.correctAnswer)
        return decodedAnswers // return decoded answer array
    }

    decode = (string) => he.decode(string) // decode a single string
    
}