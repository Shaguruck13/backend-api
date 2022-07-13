
const notNumber = (id, next) => {
    if(isNaN(+(id)) || +id < 1){
        let error = new Error ("ID must be a number")
        error.status = 400
        next (error)
        return true
    } else {
        return false 
    }
}
module.exports = notNumber