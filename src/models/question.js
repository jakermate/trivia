export class questionTrueFalse{
        constructor(questionString, difficulty, category, correctAnswer){
            this.questionString= questionString
            this.correctAnswer= correctAnswer
            this.selectedAnswer= 0 // temp int 0 until used
            this.difficulty= difficulty
            this.category=category
        }
    
}
export class questionMultipleChoice{
    constructor(questionString, difficulty, category, answers, correctAnswer){
        this.questionString= questionString
        this.answers= answers
        this.correctAnswer= this.answers.push(correctAnswer)
        this.selectedAnswer= 0 // set to integer 0 as placeholder until used
        this.difficulty= difficulty
        this.category=category
    }
    
}