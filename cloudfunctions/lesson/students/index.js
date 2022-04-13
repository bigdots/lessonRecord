const {db} = require('../basic')

const del = require("./delete");
const get = require("./get");
const set = require("./set");
const update = require("./update");
const studentC = db.collection("students");

module.exports = {
  get: (event, context) => {
    return get(event, context, studentC);
  },
  set: (event, context) => {
    return set(event, context, studentC);
  },
  delete: (event, context) => {
    return del(event, context, studentC);
  },
  update: (event, context) => {
    return update(event, context, studentC);
  },
};
