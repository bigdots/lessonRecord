// const collection = require('../collection');
const del = require('./delete');
const get = require('./get');
const set = require('./set');
const update = require('./update')

const {db} = require('../basic')
const TeacherC = db.collection('teachers')

module.exports = {
    get: (event,context)=>{
        return get(event,context,TeacherC)
    },
    set: (event,context)=>{
        return set(event,context,TeacherC)
    },
    delete: (event,context)=>{
        return del(event,context,TeacherC)
    },
    update: (event,context)=>{
        return update(event,context,TeacherC)
    }
}

