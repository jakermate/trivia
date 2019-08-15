import uuid from 'uuid'
export default class Score {
    constructor(category, difficulty, test, total, id){
        this.category = category
        this.difficulty = difficulty
        this.correct = 0
        this.correctedTest = this.grade(test)
        this.total = total
        this.userID = id
        this.date = new Date()
        this.gameID = uuid()
    }
    grade = (test) => {
        test.forEach((question ,index)=>{
            if (question.selectedAnswer === question.correctAnswer){
                this.correct += 1
                question.isCorrect = true
            }
            else{
                question.isCorrect = false
            }

        })
        return test
    }
}