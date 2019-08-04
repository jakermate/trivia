export default class Config{
    constructor(difficulty, format, category){
        this.difficulty = this.parseDifficulty(difficulty)
        this.format = this.parseFormat(format)
        this.category = category
    }
    parseDifficulty = (difficulty) => {
        if(difficulty == 0){
            return 'easy'
        }
        if(difficulty == 1){
            return 'medium'
        }
        if(difficulty == 2){
            return 'hard'
        }
    }
    parseFormat = (format) => {
        if(format == 0){
            return 'boolean'
        }
        if(format == 1){
            return 'multiple'
        }
    }
}