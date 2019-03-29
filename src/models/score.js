export default class Score {
    constructor(category, difficulty, correct, total, id){
        this.category = category
        this.difficulty = difficulty
        this.correct = correct
        this.total = total
        this.id = id
        this.time = new Date()
    }
}