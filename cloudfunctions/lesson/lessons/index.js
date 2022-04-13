// const collection = require('../collection');
const del = require('./delete');
const get = require('./get');
const set = require('./set');
// const update = require('./update')
const {db} = require('../basic')

const lessonC = db.collection('lessons')

module.exports = {
    get: (event,context)=>{
        return get(event,context,lessonC)
    },
    set: (event,context)=>{
        return set(event,context,lessonC)
    },
    delete: (event,context)=>{
        return del(event,context,lessonC)
    },
    update: (event,context)=>{
        return update(event,context,lessonC)
    }
}

