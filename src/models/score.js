import uuid from 'uuid'
export default class Score {
    constructor(category, difficulty, correct, total, id){
        this.category = category
        this.difficulty = difficulty
        this.correct = correct
        this.total = total
        this.userID = id
        this.date = new Date()
        this.gameID = uuid()
    }
}