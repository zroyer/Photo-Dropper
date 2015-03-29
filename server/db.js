'use strict';

var r = require('rethinkdb')
var q = require('q')

var dbConnection = {
  'host': 'localhost',
  'port': 28015,
  'db': 'photo_dropper_db'
};

r.connections = [];
r.getNewConnection = function () {
  return r.connect(dbConnection)
    .then(function (conn) {
      conn.use(dbConnection.db)
      r.connections.push(conn)
      return conn
    });
};

r.connect(dbConnection)
  .then(function (conn) {
    r.conn = conn
    r.connections.push(conn)
    return r.dbCreate(dbConnection.db).run(r.conn)
      .catch(function () {})
      .then(function () {
        r.conn.use(dbConnection.db)
        return r.tableList().run(r.conn)
          .then(function (tableList) {
            return q()
              .then(function() {
                if (tableList.indexOf('images') === -1) {
                  return r.tableCreate('images').run(r.conn)
                }
              });
          });
      });
  });

module.exports = r;