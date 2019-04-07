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
        this.answers= answers
        this.correctAnswer= this.answers.push(correctAnswer)
        this.selectedAnswer= null // set to integer 0 as placeholder until used
        this.difficulty= difficulty
        this.category=category
        this.type = "multiple"
    }
    
}