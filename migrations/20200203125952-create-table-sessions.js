/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-var */
/* eslint-disable func-names */
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

exports.up = async function(db) {
  await db.runSql(`CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    user_id INT,
    session_id uuid DEFAULT uuid_generate_v4()
  )`);
  return db.runSql(`ALTER TABLE session 
  ADD FOREIGN KEY (user_id) REFERENCES users (id)`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE session`);
};

exports._meta = {
  version: 1,
};
