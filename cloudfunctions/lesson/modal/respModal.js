
module.exports = {
    success(data){
        return {
            data: data,
            succeed: true
        }
    },
    error (data){
        return {
            succeed: false
        }
    }
}

