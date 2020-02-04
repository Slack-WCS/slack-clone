/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable no-var */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    id_chan INT references channel(id)
    ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT
  )`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE message`);
};

exports._meta = {
  version: 1,
};
