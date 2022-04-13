const cloud = require('wx-server-sdk');
cloud.init({
  env: 'testcloud-9ge0igqb96370aba'
});

const db = cloud.database()

module.exports = {
  cloud,
  db
}