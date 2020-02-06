/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
let dbm;
let type;
let seed;

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
  return db.runSql(`INSERT INTO messages (content, id_chan) VALUES
    ('1er message chan 1', '1'),
    ('2e message chan 1', '1'),
    ('3e message chan 1', '1'),
    ('4e message chan 1', '1'),
    ('1er message chan 2', '2'),
    ('2e message chan 2', '2'),
    ('3e message chan 2', '2'),
    ('4e message chan 2', '2')
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1,
};
